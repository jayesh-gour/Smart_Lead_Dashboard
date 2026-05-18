import { Outlet, Link } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-brand-700 to-slate-900 p-12 text-white lg:flex">
        <div>
          <span className="text-2xl font-bold">Smart Leads</span>
          <p className="mt-2 text-brand-100">Lead management that stays out of your way.</p>
        </div>
        <blockquote className="text-lg text-slate-200">
          Track prospects, filter fast, and export when you need a spreadsheet — without the clutter.
        </blockquote>
      </div>
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-block text-xl font-bold text-brand-600 lg:hidden">
            Smart Leads
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
