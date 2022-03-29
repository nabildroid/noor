import React from "react";
import { Save, Loader } from "react-feather";

interface SavingButtonProps {
  onClick(): void;
  loading?: boolean;
}
const SavingButton: React.FC<SavingButtonProps> = ({
  children,
  onClick,
  loading,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
      {!loading && <Save className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />}
      {loading && (
        <Loader
          className="animate-spin ml-2 -mr-0.5 h-4 w-4"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SavingButton;
