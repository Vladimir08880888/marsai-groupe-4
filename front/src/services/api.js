const API_URL = "http://localhost:3000";

// Films API
export const filmsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/films`);
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
      headers: {
        "Content-Type": "application/json",
      },
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
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur de connexion");
    return result;
  },

  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Erreur d'inscription");
    return result;
  },
};
