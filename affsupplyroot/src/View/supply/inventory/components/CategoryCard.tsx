"use client"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { FiPlus, FiMoreVertical } from "react-icons/fi"
import { toast } from "sonner"
import useCategory from "@/hooks/useCategory"
import useCategoryGlobal from "@/hooks/useCategoryGlobal"
import Image from "next/image"

export default function CategoryCard() {
  const { categoriesGlobal, fetchCategoriesGlobal } = useCategoryGlobal()
  const { categories, createCategory, updateCategory, deleteCategory, fetchCategories } = useCategory()

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryGlobalId: "",
    image: null as File | null,
  })

  useEffect(() => {
    fetchCategories()
    fetchCategoriesGlobal()
  }, [fetchCategories, fetchCategoriesGlobal])

  const handleOpenCreate = () => {
    setFormData({ name: "", description: "", categoryGlobalId: "", image: null })
    setEditId(null)
    setOpenModal(true)
  }
/* eslint-disable @typescript-eslint/no-explicit-any */
  const handleOpenEdit = (category: any) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      categoryGlobalId: category.categoryGlobalId?.toString() || "",
      image: null,
    })
    setEditId(category.id)
    setOpenModal(true)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) return toast.error("Tên danh mục không được để trống!")
    try {
      if (editId) {
        await updateCategory(editId, formData)
        toast.success("Cập nhật danh mục thành công!")
      } else {
        await createCategory(formData)
        toast.success("Tạo danh mục thành công!")
      }
      setOpenModal(false)
      fetchCategories()
    } catch {
      toast.error("Có lỗi xảy ra, thử lại sau!")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteCategory(deleteId)
      toast.success("Xóa danh mục thành công!")
      setOpenDeleteDialog(false)
      fetchCategories()
    } catch {
      toast.error("Xóa thất bại, thử lại sau!")
    }
  }

  const handleOpenDeleteDialog = (id: string) => {
    setDeleteId(id)
    setOpenDeleteDialog(true)
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const categoryGlobalList =
    categoriesGlobal &&
    typeof categoriesGlobal === "object" &&
    "data" in categoriesGlobal &&
    Array.isArray((categoriesGlobal as any).data?.items)
      ? (categoriesGlobal as any).data.items
      : Array.isArray(categoriesGlobal)
        ? categoriesGlobal
        : []

  return (
    <>
      <Card className="font-manuale text-xs sm:text-sm border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row justify-between items-center py-2 sm:py-3 px-3 sm:px-4 border-b space-y-0">
          <CardTitle className="text-sm sm:text-base font-semibold">Danh mục sản phẩm</CardTitle>
          <Button
            size="sm"
            onClick={handleOpenCreate}
            className="flex items-center gap-1 text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3"
          >
            <FiPlus size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Thêm</span>
          </Button>
        </CardHeader>

        <CardContent className="p-2 sm:p-3 space-y-1.5 sm:space-y-2">
          {categories.length === 0 ? (
            <p className="text-gray-400 text-xs sm:text-sm text-center py-2 sm:py-3">Chưa có danh mục nào</p>
          ) : (
            /* eslint-disable @typescript-eslint/no-explicit-any */
            categories.map((category: any) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-2 sm:p-2.5 border rounded-md hover:bg-gray-50 transition-all gap-2"
              >
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="font-medium text-xs sm:text-sm truncate">{category.name}</span>
                  {category.description && (
                    <span className="text-[10px] sm:text-xs text-gray-500 truncate">{category.description}</span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 sm:gap-1.5 shrink-0">
                  <Badge variant="secondary" className="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 font-medium">
                    {category.count || 0}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-gray-100 transition-colors touch-manipulation">
                        <FiMoreVertical size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-24 sm:w-28 text-xs sm:text-sm">
                      <DropdownMenuItem
                        onClick={() => handleOpenEdit(category)}
                        className="cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                      >
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenDeleteDialog(category.id)}
                        className="cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md text-xs sm:text-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base font-semibold">
              {editId ? "Sửa danh mục" : "Thêm danh mục"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 sm:space-y-3">
            <Input
              placeholder="Tên danh mục"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-8 sm:h-9 text-xs sm:text-sm"
            />
            <Input
              placeholder="Mô tả (tùy chọn)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-8 sm:h-9 text-xs sm:text-sm"
            />

            <Select
              value={formData.categoryGlobalId || undefined}
              onValueChange={(value) => setFormData({ ...formData, categoryGlobalId: value })}
            >
              <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
                <SelectValue placeholder="Chọn danh mục toàn cục" />
              </SelectTrigger>
              <SelectContent>
                {/* eslint-disable @typescript-eslint/no-explicit-any */
                categoryGlobalList.map((global: any) => (
                  <SelectItem key={global.id} value={global.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={global.image || "/placeholder.svg"}
                        alt={global.name}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded object-cover"
                      />
                      <span className="text-xs sm:text-sm">{global.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <label className="block text-[10px] sm:text-xs font-medium mb-1 text-gray-600">Ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                className="block w-full text-[10px] sm:text-xs text-gray-500 file:mr-2 sm:file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 file:text-[10px] sm:file:text-xs"
              />
              {formData.image && (
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate">Đã chọn: {formData.image.name}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-3 sm:mt-4 flex flex-row justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpenModal(false)} className="h-8 text-xs sm:text-sm">
              Hủy
            </Button>
            <Button size="sm" onClick={handleSubmit} className="h-8 text-xs sm:text-sm">
              {editId ? "Cập nhật" : "Tạo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm text-xs sm:text-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base font-semibold text-red-600">Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-xs sm:text-sm">
            Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.
          </p>
          <DialogFooter className="mt-3 sm:mt-4 flex flex-row justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenDeleteDialog(false)}
              className="h-8 text-xs sm:text-sm"
            >
              Hủy
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete} className="h-8 text-xs sm:text-sm">
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
