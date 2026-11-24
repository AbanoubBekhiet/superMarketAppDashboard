import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { CardSkeleton, EmptyState, ErrorState } from '@/components/ui/StateViews';
import { STRINGS } from '@/constants/strings';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/features/categories/hooks/useCategories';
import { formatNumber } from '@/lib/format';
import { getImageUrl } from '@/lib/images';
import type { Category } from '@/types/domain';

const categorySchema = z.object({
  name: z.string().trim().min(2, STRINGS.common.requiredField),
  isActive: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoriesPage() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const { data: categories = [], isLoading, isError, refetch } = useCategories(search);
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', isActive: true },
  });

  const openAddModal = () => {
    setEditing(null);
    reset({ name: '', isActive: true });
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditing(cat);
    reset({ name: cat.name, isActive: cat.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (values: CategoryFormValues) => {
    if (editing) {
      await updateCategory({ id: editing.id, payload: values });
    } else {
      await createCategory(values);
    }
    toast.success(STRINGS.categories.savedToast);
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    toast.success(STRINGS.categories.deletedToast);
  };

  return (
    <AdminLayout
      title={STRINGS.categories.pageTitle}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder={STRINGS.categories.searchPlaceholder}
    >
      <div className="flex items-center justify-between gap-md flex-wrap">
        <p className="font-body text-body-md text-on-surface-muted">{STRINGS.categories.subtitle}</p>
        <Button variant="mint-outline" size="md" onClick={openAddModal}>
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span>{STRINGS.categories.addCategoryBtn}</span>
        </Button>
      </div>

      {isLoading ? (
        <CardSkeleton count={6} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : categories.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg items-stretch">
          {categories.map((cat) => (
            <Card key={cat.id} className="flex flex-col justify-between gap-base">
              <div className="flex items-center gap-md">
                <div className="w-16 h-16 rounded-lg bg-mint-surface border border-outline p-xs shrink-0 overflow-hidden">
                  <img
                    src={getImageUrl(cat.imageKey)}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <h2 className="font-headline text-title-lg text-on-surface">{cat.name}</h2>
                  <span className="font-body text-body-sm text-on-surface-muted tabular-nums">
                    {formatNumber(cat.productCount)} {STRINGS.categories.productCountSuffix} •{' '}
                    {cat.isActive
                      ? STRINGS.categories.activeLabel
                      : STRINGS.categories.inactiveLabel}
                  </span>
                </div>
              </div>

              <footer className="pt-md border-t border-outline-subtle flex items-center justify-between gap-sm">
                <Badge variant={cat.isActive ? 'mint' : 'neutral'}>
                  {cat.isActive
                    ? STRINGS.categories.visibleBadge
                    : STRINGS.categories.hiddenBadge}
                </Badge>
                <div className="flex items-center gap-xs">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary"
                    onClick={() => openEditModal(cat)}
                  >
                    {STRINGS.common.edit}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                  >
                    {STRINGS.common.delete}
                  </Button>
                </div>
              </footer>
            </Card>
          ))}
        </section>
      )}

      {/* Add / Edit Category Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? STRINGS.categories.modalEditTitle : STRINGS.categories.modalAddTitle}
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md" noValidate>
          <Input
            label={STRINGS.categories.nameLabel}
            placeholder={STRINGS.categories.namePlaceholder}
            error={errors.name?.message}
            {...register('name')}
          />

          <label className="flex items-center gap-sm cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-outline text-primary focus:ring-primary"
              {...register('isActive')}
            />
            <span className="font-label text-label-md text-on-surface">
              {STRINGS.categories.visibilityToggleLabel}
            </span>
          </label>

          <div className="flex items-center gap-sm pt-sm">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isCreating || isUpdating}
              className="flex-1"
            >
              {STRINGS.common.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setModalOpen(false)}
            >
              {STRINGS.common.cancel}
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
