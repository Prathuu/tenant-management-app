export const AuthVisual = () => {
  return (
    <div className="hidden md:flex items-center justify-center relative overflow-hidden">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />

      {/* glow blob */}
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full top-10 left-10" />

      <div className="relative z-10 text-center px-10">
        <h1 className="text-4xl font-bold mb-4">Tenant Management System</h1>
        <p className="text-muted-foreground">
          Manage buildings, tenants, and payments effortlessly.
        </p>
      </div>
    </div>
  );
};
