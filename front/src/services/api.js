const API_URL = "http://localhost:3000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Films API
export const filmsApi = {
  getPublic: async () => {
    const response = await fetch(`${API_URL}/films/public`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des films");
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/films`, { headers: authHeaders() });
    if (!response.ok) throw new Error("Erreur lors de la récupération des films");
    return response.json();
  },

  getByStatus: async (status) => {
    const response = await fetch(`${API_URL}/films/status/${status}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des films");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/films/${id}`);
    if (!response.ok) throw new Error("Film non trouvé");
    return response.json();
  },

  create: async (formData) => {
    const response = await fetch(`${API_URL}/films`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur lors de la soumission");
    return result;
  },

  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${API_URL}/films/${id}`, {
      method: "PUT",
      headers: isFormData ? authHeaders() : { ...authHeaders(), "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur");
    return result;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/films/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },
};

// Evenements API
export const evenementsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/evenements`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des événements");
    return response.json();
  },

  getByType: async (type) => {
    const response = await fetch(`${API_URL}/evenements/type/${type}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des événements");
    return response.json();
  },

  getWorkshops: async () => {
    const response = await fetch(`${API_URL}/evenements/workshops`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des workshops");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/evenements/${id}`);
    if (!response.ok) throw new Error("Événement non trouvé");
    return response.json();
  },
};

// Reservations API
export const reservationsApi = {
  create: async (data) => {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur lors de la réservation");
    return result;
  },

  getByEvenement: async (evenementId) => {
    const response = await fetch(`${API_URL}/reservations/evenement/${evenementId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des réservations");
    return response.json();
  },
};

// Auth API
export const authApi = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur de connexion");
    return result;
  },

  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur d'inscription");
    return result;
  },
};

// Tags API
export const tagsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/tags`);
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },
};

// Awards API
export const awardsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/awards`);
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/awards`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur");
    return result;
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/awards/${id}`, {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/awards/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return response.json();
  },

  assignFilm: async (awardId, filmId) => {
    const response = await fetch(`${API_URL}/awards/${awardId}/films`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ id_film: filmId }),
    });
    return response.json();
  },

  removeFilm: async (awardId, filmId) => {
    const response = await fetch(`${API_URL}/awards/${awardId}/films/${filmId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return response.json();
  },
};

// Jury API
export const juryApi = {
  getAssignments: async () => {
    const response = await fetch(`${API_URL}/jury/assignments`, { headers: authHeaders() });
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },

  assign: async (id_film, id_jury) => {
    const response = await fetch(`${API_URL}/jury/assign`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ id_film, id_jury }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur");
    return result;
  },

  removeAssignment: async (id) => {
    const response = await fetch(`${API_URL}/jury/assignments/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return response.json();
  },

  getMyAssignments: async () => {
    const response = await fetch(`${API_URL}/jury/my-assignments`, { headers: authHeaders() });
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },

  vote: async (id_film, vote, comment) => {
    const response = await fetch(`${API_URL}/jury/vote`, {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ id_film, vote, comment }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur");
    return result;
  },

  getVotes: async () => {
    const response = await fetch(`${API_URL}/jury/votes`, { headers: authHeaders() });
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },
};

// Site Content API
export const contentApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/content`);
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },

  upsert: async (key, value, type) => {
    const response = await fetch(`${API_URL}/content`, {
      method: "PUT",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ key, value, type }),
    });
    return response.json();
  },
};

// Users API
export const usersApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/users`, { headers: authHeaders() });
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  },

  getJury: async () => {
    const users = await usersApi.getAll();
    return users.filter((u) => u.role === "JURY");
  },
};
