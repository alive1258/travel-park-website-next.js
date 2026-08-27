"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import {
  useGetRolePermissionMatrixQuery,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
  useUpsertRolePermissionMatrixMutation,
} from "@/src/redux/api/rolesApi";
import {
  CreateRoleRequest,
  RolePermissionMatrixRow,
} from "@/src/types/roleType";
import { ApiError } from "@/src/types/authType";

interface EditRoleFormValues {
  name: string;
  description?: string;
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA7FF] focus:border-[#2AA7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

type PermissionField = "can_view" | "can_create" | "can_edit" | "can_delete";

const PERMISSION_COLUMNS: { key: PermissionField; label: string }[] = [
  { key: "can_view", label: "View" },
  { key: "can_create", label: "Create" },
  { key: "can_edit", label: "Edit" },
  { key: "can_delete", label: "Delete" },
];

interface Props {
  id: string;
}

// Radio-look toggle for a single permission inside a menu card — a filled
// dot reads faster at a glance across many small cards than a checkbox.
const PermissionOption: React.FC<{
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
}> = ({ checked, disabled, label, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={onChange}
    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
      checked
        ? "bg-[#2AA7FF]/10 text-[#2AA7FF]"
        : "text-gray-600 hover:bg-gray-50"
    } ${disabled ? "" : "cursor-pointer"}`}
  >
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        checked ? "border-[#2AA7FF]" : "border-gray-300"
      }`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-[#2AA7FF]" />}
    </span>
    {label}
  </button>
);

const EditRole: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading: isLoadingRole } = useGetSingleRoleQuery(id);
  const [updateRole, { isLoading: isSaving }] = useUpdateRoleMutation();

  const { data: matrixData, isLoading: isLoadingMatrix } =
    useGetRolePermissionMatrixQuery(id);
  const [upsertRolePermissionMatrix, { isLoading: isSavingPermissions }] =
    useUpsertRolePermissionMatrixMutation();

  // Local edits are held as a sparse overlay keyed by menu_id, rather than a
  // full copy of the fetched matrix in state — that keeps this component
  // from ever needing to sync query data into state inside an effect.
  const [overrides, setOverrides] = useState<
    Record<string, Partial<Pick<RolePermissionMatrixRow, PermissionField>>>
  >({});

  const { register, handleSubmit, reset } = useForm<EditRoleFormValues>();

  const role = data?.data;
  const isSystem = !!role?.is_system;

  const matrix = useMemo<RolePermissionMatrixRow[]>(() => {
    const rows = matrixData?.data || [];
    return rows.map((row) => ({ ...row, ...overrides[row.menu_id] }));
  }, [matrixData, overrides]);

  useEffect(() => {
    if (role) {
      reset({
        name: role.name,
        description: role.description ?? "",
      });
    }
  }, [role, reset]);

  const onSubmit: SubmitHandler<EditRoleFormValues> = async (values) => {
    try {
      const payload: Partial<CreateRoleRequest> = {
        name: values.name,
        description: values.description || undefined,
      };

      await updateRole({ id, data: payload }).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Role updated",
        timer: 1200,
        showConfirmButton: false,
      });
      router.refresh();
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Could not update role",
        text: error.data?.message || error.message || "Something went wrong.",
      });
    }
  };

  const handleToggle = (menuId: string, field: PermissionField) => {
    if (isSystem) return;
    const currentRow = matrix.find((row) => row.menu_id === menuId);
    if (!currentRow) return;

    setOverrides((prev) => ({
      ...prev,
      [menuId]: { ...prev[menuId], [field]: !currentRow[field] },
    }));
  };

  const handleSavePermissions = async () => {
    if (isSystem) return;
    try {
      await upsertRolePermissionMatrix({
        id,
        data: {
          grants: matrix.map((row) => ({
            menu_id: row.menu_id,
            can_view: row.can_view,
            can_create: row.can_create,
            can_edit: row.can_edit,
            can_delete: row.can_delete,
          })),
        },
      }).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Permissions saved",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Could not save permissions",
        text: error.data?.message || error.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-2xl">
        <Link
          href="/dashboard/roles/all-roles"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to roles
        </Link>

        <h1 className="text-lg font-semibold text-gray-900 mb-1">Edit Role</h1>

        {isLoadingRole ? (
          <div className="mt-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : !role ? (
          <p className="mt-6 text-sm text-gray-500">Role not found.</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className={inputClass}
                disabled={isSaving || isSystem}
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className={inputClass}
                disabled={isSaving || isSystem}
                {...register("description")}
              />
            </div>

            {!isSystem && (
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            )}
          </form>
        )}
      </div>

      {role && (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Permissions
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Control what this role can view, create, edit, and delete for each
            menu.
          </p>

          {isSystem && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                Super Admin has all permissions and cannot be restricted.
              </span>
            </div>
          )}

          {isLoadingMatrix ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              {matrix.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {matrix.map((row) => {
                    const rowHasAnyGrant =
                      row.can_view ||
                      row.can_create ||
                      row.can_edit ||
                      row.can_delete;
                    return (
                      <div
                        key={row.menu_id}
                        className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              rowHasAnyGrant ? "bg-emerald-500" : "bg-gray-300"
                            }`}
                          />
                          <h3
                            className="text-sm font-semibold text-gray-800 truncate"
                            title={row.menu_label}
                          >
                            {row.menu_label}
                          </h3>
                        </div>
                        <div className="space-y-1">
                          {PERMISSION_COLUMNS.map((col) => (
                            <PermissionOption
                              key={col.key}
                              checked={isSystem ? true : row[col.key]}
                              disabled={isSystem}
                              label={col.label}
                              onChange={() =>
                                handleToggle(row.menu_id, col.key)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-gray-500">
                  No menu items found.
                </p>
              )}

              {!isSystem && (
                <button
                  type="button"
                  onClick={handleSavePermissions}
                  disabled={isSavingPermissions || matrix.length === 0}
                  className="mt-4 w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSavingPermissions ? "Saving..." : "Save Permissions"}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EditRole;

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useForm, SubmitHandler } from "react-hook-form";
// import Swal from "sweetalert2";
// import { ArrowLeft, ShieldAlert } from "lucide-react";
// import {
//   useGetRolePermissionMatrixQuery,
//   useGetSingleRoleQuery,
//   useUpdateRoleMutation,
//   useUpsertRolePermissionMatrixMutation,
// } from "@/src/redux/api/rolesApi";
// import {
//   CreateRoleRequest,
//   RolePermissionMatrixRow,
// } from "@/src/types/roleType";
// import { ApiError } from "@/src/types/authType";

// interface EditRoleFormValues {
//   name: string;
//   description?: string;
// }

// const inputClass =
//   "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA7FF] focus:border-[#2AA7FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

// type PermissionField = "can_view" | "can_create" | "can_edit" | "can_delete";

// const PERMISSION_COLUMNS: { key: PermissionField; label: string }[] = [
//   { key: "can_view", label: "View" },
//   { key: "can_create", label: "Create" },
//   { key: "can_edit", label: "Edit" },
//   { key: "can_delete", label: "Delete" },
// ];

// interface Props {
//   id: string;
// }

// const EditRole: React.FC<Props> = ({ id }) => {
//   const router = useRouter();
//   const { data, isLoading: isLoadingRole } = useGetSingleRoleQuery(id);
//   const [updateRole, { isLoading: isSaving }] = useUpdateRoleMutation();

//   const { data: matrixData, isLoading: isLoadingMatrix } =
//     useGetRolePermissionMatrixQuery(id);
//   const [upsertRolePermissionMatrix, { isLoading: isSavingPermissions }] =
//     useUpsertRolePermissionMatrixMutation();

//   // Local edits are held as a sparse overlay keyed by menu_id, rather than a
//   // full copy of the fetched matrix in state — that keeps this component
//   // from ever needing to sync query data into state inside an effect.
//   const [overrides, setOverrides] = useState<
//     Record<string, Partial<Pick<RolePermissionMatrixRow, PermissionField>>>
//   >({});

//   const { register, handleSubmit, reset } = useForm<EditRoleFormValues>();

//   const role = data?.data;
//   const isSystem = !!role?.is_system;

//   const matrix = useMemo<RolePermissionMatrixRow[]>(() => {
//     const rows = matrixData?.data || [];
//     return rows.map((row) => ({ ...row, ...overrides[row.menu_id] }));
//   }, [matrixData, overrides]);

//   useEffect(() => {
//     if (role) {
//       reset({
//         name: role.name,
//         description: role.description ?? "",
//       });
//     }
//   }, [role, reset]);

//   const onSubmit: SubmitHandler<EditRoleFormValues> = async (values) => {
//     try {
//       const payload: Partial<CreateRoleRequest> = {
//         name: values.name,
//         description: values.description || undefined,
//       };

//       await updateRole({ id, data: payload }).unwrap();
//       await Swal.fire({
//         icon: "success",
//         title: "Role updated",
//         timer: 1200,
//         showConfirmButton: false,
//       });
//       router.refresh();
//     } catch (err) {
//       const error = err as ApiError;
//       Swal.fire({
//         icon: "error",
//         title: "Could not update role",
//         text: error.data?.message || error.message || "Something went wrong.",
//       });
//     }
//   };

//   const handleToggle = (menuId: string, field: PermissionField) => {
//     if (isSystem) return;
//     const currentRow = matrix.find((row) => row.menu_id === menuId);
//     if (!currentRow) return;

//     setOverrides((prev) => ({
//       ...prev,
//       [menuId]: { ...prev[menuId], [field]: !currentRow[field] },
//     }));
//   };

//   const handleSavePermissions = async () => {
//     if (isSystem) return;
//     try {
//       await upsertRolePermissionMatrix({
//         id,
//         data: {
//           grants: matrix.map((row) => ({
//             menu_id: row.menu_id,
//             can_view: row.can_view,
//             can_create: row.can_create,
//             can_edit: row.can_edit,
//             can_delete: row.can_delete,
//           })),
//         },
//       }).unwrap();

//       await Swal.fire({
//         icon: "success",
//         title: "Permissions saved",
//         timer: 1200,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       const error = err as ApiError;
//       Swal.fire({
//         icon: "error",
//         title: "Could not save permissions",
//         text: error.data?.message || error.message || "Something went wrong.",
//       });
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-2xl">
//         <Link
//           href="/dashboard/roles/all-roles"
//           className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to roles
//         </Link>

//         <h1 className="text-lg font-semibold text-gray-900 mb-1">Edit Role</h1>

//         {isLoadingRole ? (
//           <div className="mt-6 space-y-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-10 bg-gray-100 rounded-lg animate-pulse"
//               />
//             ))}
//           </div>
//         ) : !role ? (
//           <p className="mt-6 text-sm text-gray-500">Role not found.</p>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name
//               </label>
//               <input
//                 className={inputClass}
//                 disabled={isSaving || isSystem}
//                 {...register("name", { required: true })}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 rows={4}
//                 className={inputClass}
//                 disabled={isSaving || isSystem}
//                 {...register("description")}
//               />
//             </div>

//             {!isSystem && (
//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-[#2AA7FF] hover:bg-[#1c8fe0] rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isSaving ? "Saving..." : "Save Changes"}
//               </button>
//             )}
//           </form>
//         )}
//       </div>

//       {role && (
//         <div className="rounded-lg border border-gray-200 bg-white p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-1">
//             Permissions
//           </h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Control what this role can view, create, edit, and delete for each
//             menu.
//           </p>

//           {isSystem && (
//             <div className="mb-4 flex items-start gap-2 rounded-lg border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800">
//               <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
//               <span>
//                 Super Admin has all permissions and cannot be restricted.
//               </span>
//             </div>
//           )}

//           {isLoadingMatrix ? (
//             <div className="space-y-3">
//               {[...Array(6)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-10 bg-gray-100 rounded-lg animate-pulse"
//                 />
//               ))}
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
//                         Menu
//                       </th>
//                       {PERMISSION_COLUMNS.map((col) => (
//                         <th
//                           key={col.key}
//                           className="px-5 py-3 text-center text-sm font-semibold text-gray-700"
//                         >
//                           {col.label}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {matrix.length > 0 ? (
//                       matrix.map((row) => (
//                         <tr
//                           key={row.menu_id}
//                           className="border-t border-gray-200 hover:bg-gray-50 transition"
//                         >
//                           <td className="px-5 py-3 text-sm font-medium text-gray-800">
//                             {row.menu_label}
//                           </td>
//                           {PERMISSION_COLUMNS.map((col) => (
//                             <td key={col.key} className="px-5 py-3 text-center">
//                               <input
//                                 type="checkbox"
//                                 checked={isSystem ? true : row[col.key]}
//                                 disabled={isSystem}
//                                 onChange={() =>
//                                   handleToggle(row.menu_id, col.key)
//                                 }
//                                 className="h-4 w-4 rounded border-gray-300 text-[#2AA7FF] focus:ring-[#2AA7FF] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
//                               />
//                             </td>
//                           ))}
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan={PERMISSION_COLUMNS.length + 1}
//                           className="py-10 text-center text-gray-500"
//                         >
//                           No menu items found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {!isSystem && (
//                 <button
//                   type="button"
//                   onClick={handleSavePermissions}
//                   disabled={isSavingPermissions || matrix.length === 0}
//                   className="mt-4 w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSavingPermissions ? "Saving..." : "Save Permissions"}
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditRole;
