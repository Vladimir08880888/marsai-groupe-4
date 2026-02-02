import { useEffect, useState } from "react";

import { deleteUser, getUsers, updateUser, getRoles } from "../../api/users.js";
import { useMutation } from "@tanstack/react-query";

import { createUser } from "../../api/users.js";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";


const registerSchema = z.object({
  // Champs de notre formulaire
  id: z.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
  mobile: z.string(),
  email: z.string(),
  phone: z.string(),
  birth_date: z.string(),
  street: z.string(),
  postal_code: z.string(),
  city: z.string(),
  country: z.string(),
  biography: z.string(),
  current_job: z.string(),
  portfolio_url: z.string(),
  youtube_url: z.string(),
  instagram_url: z.string(),
  linkedin_url: z.string(),
  facebook_url: z.string(),
  tiktok_ur: z.string(),
  discovery_source: z.string(),
  role: z.string(),
});

function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modeEdit, setModeEdit] = useState(false);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data.data);
    });
    
    getRoles().then((data) => {
      setRoles(data.data);
    });
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (newUser) => {
      return await createUser(newUser);
    },
    onSuccess: (data, variables, context) => {
      window.location.reload();
    },
  });

  function onSubmit(data) {
    return registerMutation.mutate(data);
  }

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteUser(id);
    },
    onSuccess: (data, variables, context) => {
      window.location.reload();
    },
  });

  function handleDelete(id) {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      deleteMutation.mutate(id);
    }
  }

  const updateMutation = useMutation({
    mutationFn: async (updatedUser) => {
      return await updateUser(updatedUser.id, updatedUser);
    },
    onSuccess: (data, variables, context) => {
      window.location.reload();
    },
  });

    function handleEdit(user) {
      setValue("id", user.id);
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("password", user.password);
      setValue("mobile", user.mobile);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("birth_date", user.birth_date);
      setValue("street", user.street);
      setValue("postal_code", user.postal_code);
      setValue("city", user.city);
      setValue("country", user.country);
      setValue("biography", user.biography);
      setValue("current_job", user.current_job);
      setValue("portfolio_url", user.portfolio_url);
      setValue("youtube_url", user.youtube_url);
      setValue("instagram_url", user.instagram_url);
      setValue("linkedin_url", user.linkedin_url);
      setValue("facebook_url", user.facebook_url);
      setValue("tiktok_ur", user.tiktok_ur);
      setValue("discovery_source", user.discovery_source);
      setValue("role", user.role);
      setModeEdit(true);
    }

    function handleReset() {
      setValue("id", undefined);
      setValue("first_name", "");
      setValue("last_name", "");
      setValue("password", "");
      setValue("mobile", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("birth_date", "");
      setValue("street", "");
      setValue("postal_code", "");
      setValue("city", "");
      setValue("country", "");
      setValue("biography", "");
      setValue("current_job", "");
      setValue("portfolio_url", "");
      setValue("youtube_url", "");
      setValue("instagram_url", "");
      setValue("linkedin_url", "");
      setValue("facebook_url", "");
      setValue("tiktok_ur", "");
      setValue("discovery_source", "");
      setValue("role", "");
      setModeEdit(false);
    }

    function onUpdate(updatedUser) {
      console.log(updateUser);
      updateMutation.mutate(updatedUser);
    }
    



  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-black rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Liste des utilisateurs</h2>
        {users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex gap-4 items-center flex-1">
                  <h3 className="font-semibold text-gray-900">{user.first_name} {user.last_name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{user.role}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(user)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Aucun utilisateur trouvé.</div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl text-white font-bold mb-6">
          {modeEdit ? "Modifier un utilisateur" : "Créer un utilisateur"}
        </h2>
        <form
          onSubmit={modeEdit ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input type="hidden" id="id" {...register("id")} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input id="first_name" type="text" {...register("first_name")} required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input id="last_name" type="text" {...register("last_name")} required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" type="email" {...register("email")} required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input id="password" type="password" {...register("password")} required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input id="mobile" type="text" {...register("mobile")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input id="phone" type="text" {...register("phone")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input id="birth_date" type="date" {...register("birth_date")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Rue</label>
              <input id="street" type="text" {...register("street")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
              <input id="postal_code" type="text" {...register("postal_code")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input id="city" type="text" {...register("city")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
              <input id="country" type="text" {...register("country")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="current_job" className="block text-sm font-medium text-gray-700 mb-1">Emploi actuel</label>
              <input id="current_job" type="text" {...register("current_job")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
            <textarea id="biography" {...register("biography")} rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="portfolio_url" className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
              <input id="portfolio_url" type="url" {...register("portfolio_url")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input id="youtube_url" type="url" {...register("youtube_url")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input id="instagram_url" type="url" {...register("instagram_url")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input id="linkedin_url" type="url" {...register("linkedin_url")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input id="facebook_url" type="url" {...register("facebook_url")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="tiktok_ur" className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
              <input id="tiktok_ur" type="url" {...register("tiktok_ur")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="discovery_source" className="block text-sm font-medium text-gray-700 mb-1">Source de découverte</label>
              <input id="discovery_source" type="text" {...register("discovery_source")} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <select id="role" {...register("role")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
                <option value="">Sélectionner un rôle</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {modeEdit && (
              <button 
                type="button" 
                onClick={handleReset}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Annuler la modification
              </button>
            )}
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {modeEdit ? "Mettre à jour" : "Créer un utilisateur"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Users;
