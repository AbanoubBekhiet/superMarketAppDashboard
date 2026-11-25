import { zodResolver } from '@hookform/resolvers/zod';
import { legacyCreateColumnHelper, type LegacyColumnDef } from '@tanstack/react-table/legacy';
import { Pencil, Trash2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { uploadProductImage } from '@/features/products/api/productsApi';
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
  sku: z.string().trim().min(2, STRINGS.common.requiredField),
  categoryId: z.string().min(1, STRINGS.common.requiredField),
  price: z.coerce.number().positive(STRINGS.common.positiveNumber),
  stock: z.coerce.number().min(0, STRINGS.common.requiredField),
  stockUnit: z.string().trim().min(1, STRINGS.common.requiredField),
});

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormValues = z.infer<typeof productSchema>;

const columnHelper = legacyCreateColumnHelper<Product>();

export function ProductsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const { data: categories = [] } = useCategories();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProducts({ categoryId: categoryFilter, search });

  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      categoryId: '',
      price: '',
      stock: '',
      stockUnit: 'عبوة',
    },
  });

  const handleEdit = useCallback(
    (product: Product) => {
      setEditingProduct(product);
      setUploadedImageUrl(product.imageKey);
      reset({
        name: product.name,
        sku: product.sku,
        categoryId: product.categoryId,
        price: String(product.price),
        stock: String(product.stock),
        stockUnit: product.stockUnit,
      });
    },
    [reset],
  );

  const handleReset = () => {
    setEditingProduct(null);
    setUploadedImageUrl(null);
    reset({
      name: '',
      sku: '',
      categoryId: categories[0]?.id ?? '',
      price: '',
      stock: '',
      stockUnit: 'عبوة',
    });
  };

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProduct(id);
      toast.success(STRINGS.products.deletedToast);
      if (editingProduct?.id === id) {
        setEditingProduct(null);
        reset({
          name: '',
          sku: '',
          categoryId: categories[0]?.id ?? '',
          price: '',
          stock: '',
          stockUnit: 'عبوة',
        });
      }
    },
    [categories, deleteProduct, editingProduct?.id, reset],
  );

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadProductImage(editingProduct?.sku ?? 'new', file);
      setUploadedImageUrl(url);
      toast.success(STRINGS.common.imageUploaded);
    } catch {
      toast.error(STRINGS.common.errorTitle);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    const resolvedCategoryId = values.categoryId || categories[0]?.id;
    if (!resolvedCategoryId) return;
    const payload = {
      ...values,
      categoryId: resolvedCategoryId,
      imageUrl: uploadedImageUrl ?? editingProduct?.imageKey,
    };
    if (editingProduct) {
      await updateProduct({ id: editingProduct.id, payload });
    } else {
      await createProduct(payload);
    }
    toast.success(STRINGS.products.savedToast);
    handleReset();
  };

  const columns = useMemo(
    () =>
      [
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
        columnHelper.accessor('sku', {
          header: STRINGS.products.columns.sku,
          cell: (info) => (
            <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
              {info.getValue()}
            </span>
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
        columnHelper.accessor('stock', {
          header: STRINGS.products.columns.stock,
          cell: (info) => {
            const qty = info.getValue();
            const variant = qty === 0 ? 'error' : qty <= 10 ? 'warning' : 'mint';
            return (
              <Badge variant={variant}>
                {formatNumber(qty)} {info.row.original.stockUnit}
              </Badge>
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
                onClick={() => handleDelete(info.row.original.id)}
                className="w-8 h-8 rounded-md bg-surface border border-outline-subtle text-error hover:bg-error-container flex items-center justify-center transition-colors duration-state-change"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ),
        }),
      ] as LegacyColumnDef<Product, unknown>[],
    [handleDelete, handleEdit],
  );

  return (
    <AdminLayout
      title={STRINGS.products.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.products.searchPlaceholder}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        {/* Products Table */}
        <Card padded={false} className="lg:col-span-8 overflow-hidden">
          <div className="px-lg py-md border-b border-outline-subtle flex items-center justify-between gap-md flex-wrap">
            <h2 className="font-headline text-title-lg text-on-surface tabular-nums">
              {STRINGS.products.registeredTitle} ({formatNumber(products.length)})
            </h2>
            <div className="w-48">
              <Select
                aria-label={STRINGS.products.columns.category}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: 'all', label: STRINGS.products.allCategories },
                  ...categories.map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
            </div>
          </div>

          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <DataTable data={products} columns={columns} isLoading={isLoading} />
          )}
        </Card>

        {/* Add / Edit Product Panel */}
        <Card className="lg:col-span-4 flex flex-col gap-base">
          <header className="pb-sm border-b border-outline-subtle flex items-center justify-between">
            <h2 className="font-headline text-title-lg text-on-surface">
              {STRINGS.products.formTitle}
            </h2>
            <Badge variant={editingProduct ? 'warning' : 'mint'}>
              {editingProduct ? STRINGS.products.badgeEdit : STRINGS.products.badgeNew}
            </Badge>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md" noValidate>
            <Input
              label={STRINGS.products.fields.name}
              placeholder={STRINGS.products.fields.namePlaceholder}
              error={errors.name?.message}
              {...register('name')}
            />

            <div className="grid grid-cols-2 gap-sm">
              <Input
                label={STRINGS.products.fields.sku}
                placeholder={STRINGS.products.fields.skuPlaceholder}
                error={errors.sku?.message}
                {...register('sku')}
              />
              <Select
                label={STRINGS.products.fields.category}
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                error={errors.categoryId?.message}
                {...register('categoryId')}
              />
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <Input
                label={STRINGS.products.fields.price}
                type="number"
                placeholder={STRINGS.products.fields.pricePlaceholder}
                error={errors.price?.message}
                {...register('price')}
              />
              <Input
                label={STRINGS.products.fields.stock}
                type="number"
                placeholder={STRINGS.products.fields.stockPlaceholder}
                error={errors.stock?.message}
                {...register('stock')}
              />
            </div>

            <Input
              label={STRINGS.products.fields.stockUnit}
              placeholder={STRINGS.products.fields.stockUnitPlaceholder}
              error={errors.stockUnit?.message}
              {...register('stockUnit')}
            />

            <div className="flex flex-col gap-xs">
              <label className="font-title text-title-sm text-on-surface">
                {STRINGS.common.uploadImage}
              </label>
              <input
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

            <div className="flex items-center gap-sm pt-sm">
              <Button
                type="submit"
                variant="mint-outline"
                size="lg"
                isLoading={isCreating || isUpdating}
                className="flex-1"
              >
                {STRINGS.products.saveButton}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                {STRINGS.common.cancel}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
