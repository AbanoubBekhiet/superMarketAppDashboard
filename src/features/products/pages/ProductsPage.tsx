import { zodResolver } from '@hookform/resolvers/zod';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { reserveProductId, uploadProductImage } from '@/features/products/api/productsApi';
import { deleteStorageImage } from '@/services/firebase/app';
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '@/features/products/hooks/useProducts';
import { formatCurrency, formatNumber } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import type { Product } from '@/types/domain';

const productSchema = z.object({
  name: z.string().trim().min(2, STRINGS.common.requiredField),
  categoryId: z.string().min(1, STRINGS.common.requiredField),
  price: z.coerce.number().positive(STRINGS.common.positiveNumber),
  purchasePrice: z
    .union([z.coerce.number().min(0, STRINGS.common.positiveNumber), z.literal('')])
    .optional(),
  isActive: z.boolean(),
});

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormValues = z.infer<typeof productSchema>;

const columnHelper = legacyCreateColumnHelper<Product>();

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('categoryId') || 'all';

  const [search, setSearch] = useState('');
  const [showPurchasePrice, setShowPurchasePrice] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draftProductId, setDraftProductId] = useState<string>('');
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    return () => {
      if (localPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  const handleCategoryFilterChange = (nextCategory: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextCategory === 'all') {
      nextParams.delete('categoryId');
    } else {
      nextParams.set('categoryId', nextCategory);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const { data: categories = [] } = useCategories();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts({ categoryId: categoryFilter, search });

  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutateAsync: deleteProduct, isPending: isDeletingProduct } = useDeleteProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      price: '',
      purchasePrice: '',
      isActive: true,
    },
  });

  const clearPreview = useCallback(() => {
    setLocalPreviewUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return null;
    });
    setFileInputKey((k) => k + 1);
  }, []);

  const openAddModal = useCallback(() => {
    clearPreview();
    setEditingProduct(null);
    setDraftProductId(reserveProductId());
    setUploadedImageUrl(null);
    const defaultCat = categoryFilter !== 'all' ? categoryFilter : (categories[0]?.id ?? '');
    reset({
      name: '',
      categoryId: defaultCat,
      price: '',
      purchasePrice: '',
      isActive: true,
    });
    setModalOpen(true);
  }, [categories, categoryFilter, clearPreview, reset]);

  const handleEdit = useCallback(
    (product: Product) => {
      clearPreview();
      setEditingProduct(product);
      setDraftProductId(product.id);
      setUploadedImageUrl(product.imageKey);
      reset({
        name: product.name,
        categoryId: product.categoryId,
        price: String(product.regularPrice ?? product.price),
        purchasePrice:
          product.purchasePrice !== null && product.purchasePrice !== undefined
            ? String(product.purchasePrice)
            : '',
        isActive: product.isActive ?? true,
      });
      setModalOpen(true);
    },
    [clearPreview, reset],
  );

  const closeModalOnly = () => {
    clearPreview();
    setModalOpen(false);
    setEditingProduct(null);
    setDraftProductId('');
    setUploadedImageUrl(null);
  };

  const handleCloseModal = () => {
    if (uploadedImageUrl && uploadedImageUrl !== editingProduct?.imageKey) {
      void deleteStorageImage(uploadedImageUrl).catch(() => undefined);
    }
    closeModalOnly();
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct(deletingProduct.id);
      toast.success(STRINGS.products.deletedToast);
      setDeletingProduct(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const handleToggleActive = useCallback(
    async (product: Product) => {
      try {
        const nextActive = !(product.isActive ?? true);
        await updateProduct({ id: product.id, payload: { isActive: nextActive } });
        toast.success(STRINGS.products.visibilityUpdatedToast);
      } catch (err) {
        const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
        toast.error(msg || STRINGS.common.errorMessage);
      }
    },
    [updateProduct],
  );

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setLocalPreviewUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return blobUrl;
    });
    setIsUploadingImage(true);
    const previousDraftUpload =
      uploadedImageUrl && uploadedImageUrl !== editingProduct?.imageKey
        ? uploadedImageUrl
        : null;
    try {
      const targetId = editingProduct?.id || draftProductId || reserveProductId();
      if (!draftProductId && !editingProduct?.id) {
        setDraftProductId(targetId);
      }
      const url = await uploadProductImage(targetId, file);
      if (previousDraftUpload && previousDraftUpload !== url) {
        void deleteStorageImage(previousDraftUpload).catch(() => undefined);
      }
      setUploadedImageUrl(url);
      toast.success(STRINGS.common.imageUploaded);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorTitle;
      toast.error(msg || STRINGS.common.errorTitle);
      setLocalPreviewUrl((prev) => {
        if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
        return null;
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    if (isUploadingImage) {
      toast.info(STRINGS.common.uploadingImage);
      return;
    }
    const resolvedCategoryId = values.categoryId || categories[0]?.id;
    if (!resolvedCategoryId) {
      toast.error(STRINGS.common.requiredField);
      return;
    }
    const parsedPurchase =
      typeof values.purchasePrice === 'number' && Number.isFinite(values.purchasePrice)
        ? values.purchasePrice
        : null;
    try {
      const finalImageUrl = uploadedImageUrl ?? editingProduct?.imageKey;
      const payload = {
        id: editingProduct?.id || draftProductId || undefined,
        name: values.name,
        categoryId: resolvedCategoryId,
        price: values.price,
        purchasePrice: parsedPurchase,
        isActive: values.isActive,
        imageUrl: finalImageUrl,
      };
      if (editingProduct) {
        await updateProduct({ id: editingProduct.id, payload });
      } else {
        await createProduct(payload);
      }
      toast.success(STRINGS.products.savedToast);
      closeModalOnly();
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const columns = useMemo(
    () =>
      [
        columnHelper.display({
          id: 'rowNumber',
          header: STRINGS.products.columns.index,
          cell: (info) => (
            <span className="font-title text-title-sm text-on-surface-muted tabular-nums">
              {formatNumber(info.row.index + 1)}
            </span>
          ),
        }),
        columnHelper.accessor('name', {
          header: STRINGS.products.columns.product,
          cell: (info) => (
            <div className="flex items-center gap-sm">
              <img
                src={getImageUrl(info.row.original.imageKey)}
                alt={info.getValue()}
                className="w-10 h-10 rounded-md object-cover bg-surface shrink-0"
              />
              <span className="font-title text-title-sm text-on-surface">{info.getValue()}</span>
            </div>
          ),
        }),
        columnHelper.accessor('categoryName', {
          header: STRINGS.products.columns.category,
          cell: (info) => (
            <span className="font-body text-body-sm text-on-surface">{info.getValue()}</span>
          ),
        }),
        columnHelper.accessor('price', {
          header: STRINGS.products.columns.price,
          cell: (info) => (
            <span className="font-headline text-title-sm text-primary tabular-nums">
              {formatCurrency(info.getValue())}
            </span>
          ),
        }),
        ...(showPurchasePrice
          ? [
              columnHelper.accessor((row) => row.purchasePrice ?? null, {
                id: 'purchasePrice',
                header: STRINGS.products.columns.purchasePrice,
                cell: (info) => {
                  const val = info.getValue();
                  return (
                    <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
                      {val !== null && val !== undefined ? formatCurrency(val) : '—'}
                    </span>
                  );
                },
              }),
            ]
          : []),
        columnHelper.accessor((row) => row.isActive ?? true, {
          id: 'isActive',
          header: STRINGS.products.columns.visibility,
          cell: (info) => {
            const product = info.row.original;
            const active = product.isActive ?? true;
            return (
              <button
                type="button"
                role="switch"
                aria-checked={active}
                aria-label={STRINGS.products.columns.visibility}
                onClick={() => handleToggleActive(product)}
                className={`inline-flex items-center gap-xs px-sm py-xs rounded-full border text-label-sm font-label-bold transition-colors duration-state-change ${
                  active
                    ? 'bg-mint-surface text-primary border-primary/30'
                    : 'bg-surface-subtle text-on-surface-muted border-outline-subtle'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    active ? 'bg-primary' : 'bg-on-surface-subtle'
                  }`}
                />
                <span>{active ? STRINGS.products.visibleInApp : STRINGS.products.hiddenInApp}</span>
              </button>
            );
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: STRINGS.products.columns.actions,
          cell: (info) => (
            <div className="flex items-center gap-xs">
              <button
                type="button"
                aria-label={STRINGS.common.edit}
                onClick={() => handleEdit(info.row.original)}
                className="w-8 h-8 rounded-md bg-surface border border-outline-subtle text-primary hover:bg-mint-surface flex items-center justify-center transition-colors duration-state-change"
              >
                <Pencil className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={STRINGS.common.delete}
                onClick={() => setDeletingProduct(info.row.original)}
                className="w-8 h-8 rounded-md bg-surface border border-outline-subtle text-error hover:bg-error-container flex items-center justify-center transition-colors duration-state-change"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ),
        }),
      ] as LegacyColumnDef<Product, unknown>[],
    [handleEdit, handleToggleActive, showPurchasePrice],
  );

  const previewImageSrc = localPreviewUrl ?? getImageUrl(uploadedImageUrl ?? 'local://logo');

  return (
    <AdminLayout
      title={STRINGS.products.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.products.searchPlaceholder}
    >
      <div className="flex flex-col gap-base">
        <div className="flex flex-wrap items-center justify-between gap-md">
          <div className="w-56">
            <Select
              aria-label={STRINGS.products.columns.category}
              value={categoryFilter}
              onChange={(e) => handleCategoryFilterChange(e.target.value)}
              options={[
                { value: 'all', label: STRINGS.products.allCategories },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
          </div>

          <Button variant="primary" size="md" onClick={openAddModal}>
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>{STRINGS.products.addButton}</span>
          </Button>
        </div>

        <Card padded={false} className="overflow-hidden">
          <div className="px-lg py-md border-b border-outline-subtle flex items-center justify-between gap-md flex-wrap">
            <h2 className="font-headline text-title-lg text-on-surface tabular-nums">
              {STRINGS.products.registeredTitle} ({formatNumber(products.length)})
            </h2>
            <button
              type="button"
              onClick={() => setShowPurchasePrice((prev) => !prev)}
              aria-pressed={showPurchasePrice}
              title={
                showPurchasePrice
                  ? STRINGS.products.hidePurchasePrice
                  : STRINGS.products.showPurchasePrice
              }
              className={`inline-flex items-center gap-xs px-md py-xs rounded-md border text-label-sm font-label-bold transition-colors duration-state-change ${
                showPurchasePrice
                  ? 'bg-mint-surface text-primary border-primary/40'
                  : 'bg-surface text-on-surface-muted border-outline-subtle hover:bg-mint-surface/50'
              }`}
            >
              {showPurchasePrice ? (
                <EyeOff className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Eye className="w-4 h-4" aria-hidden="true" />
              )}
              <span>
                {showPurchasePrice
                  ? STRINGS.products.hidePurchasePrice
                  : STRINGS.products.showPurchasePrice}
              </span>
            </button>
          </div>

          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <DataTable data={products} columns={columns} isLoading={isLoading} />
          )}
        </Card>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? STRINGS.products.modalEditTitle : STRINGS.products.modalAddTitle}
        maxWidthClass="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md" noValidate>
          <Input
            label={STRINGS.products.fields.name}
            placeholder={STRINGS.products.fields.namePlaceholder}
            error={errors.name?.message}
            {...register('name')}
          />

          <Select
            label={STRINGS.products.fields.category}
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            error={errors.categoryId?.message}
            {...register('categoryId')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
            <Input
              label={STRINGS.products.fields.price}
              type="number"
              placeholder={STRINGS.products.fields.pricePlaceholder}
              error={errors.price?.message}
              {...register('price')}
            />
            <Input
              label={STRINGS.products.fields.purchasePrice}
              type="number"
              placeholder={STRINGS.products.fields.purchasePricePlaceholder}
              error={errors.purchasePrice?.message}
              {...register('purchasePrice')}
            />
          </div>

          <label className="flex items-center gap-sm cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-outline text-primary focus:ring-primary"
              {...register('isActive')}
            />
            <span className="font-label text-label-md text-on-surface">
              {STRINGS.products.visibilityToggleLabel}
            </span>
          </label>

          <div className="flex flex-col gap-sm">
            <label className="font-title text-title-sm text-on-surface">
              {STRINGS.common.uploadImage}
            </label>
            <div className="flex items-center gap-md">
              {previewImageSrc ? (
                <img
                  src={previewImageSrc}
                  alt={editingProduct?.name ?? STRINGS.products.fields.name}
                  className="w-20 h-20 rounded-md object-cover border border-outline-subtle bg-surface shrink-0"
                />
              ) : null}
              <div className="flex-1 flex flex-col gap-xs">
                <input
                  key={fileInputKey}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploadingImage}
                  className="font-body text-body-sm text-on-surface-muted file:me-sm file:px-md file:py-xs file:rounded-md file:border file:border-outline-subtle file:bg-mint-surface file:text-on-mint-surface"
                />
                {isUploadingImage ? (
                  <span className="font-body text-body-sm text-primary">
                    {STRINGS.common.uploadingImage}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-sm pt-sm">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isUploadingImage}
              isLoading={isCreating || isUpdating || isUploadingImage}
              className="flex-1"
            >
              {STRINGS.products.saveButton}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleCloseModal}>
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        open={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeletingProduct}
        message={
          deletingProduct
            ? `هل أنت متأكد من حذف المنتج «${deletingProduct.name}»؟ لا يمكن التراجع عن هذا الإجراء.`
            : STRINGS.common.confirmDeleteGeneric
        }
      />
    </AdminLayout>
  );
}
