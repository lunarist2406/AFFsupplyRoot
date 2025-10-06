export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-2">🚫 Access Denied</h1>
      <p className="text-gray-600">Bạn không có quyền truy cập vào trang này.</p>
    </div>
  );
}
