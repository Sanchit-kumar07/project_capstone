import axios from 'axios';

// For production (Netlify), use static db.json
const isProduction = import.meta.env.PROD;

let cachedData = null;

const getData = async () => {
  if (cachedData) return cachedData;
  if (isProduction) {
    try {
      const res = await fetch('/db.json');
      if (!res.ok) throw new Error(`Failed to load db.json: ${res.status}`);
      cachedData = await res.json();
    } catch (error) {
      console.error('Failed to fetch db.json:', error);
      // Fallback to empty properties array on error
      cachedData = { properties: [] };
    }
  } else {
    try {
      const res = await axios.get('/api/properties');
      cachedData = { properties: res.data };
    } catch (error) {
      console.error('Failed to fetch properties from API:', error);
      cachedData = { properties: [] };
    }
  }
  return cachedData;
};

const filterProperties = (properties, params) => {
  let filtered = [...properties];

  if (params.search) {
    const search = params.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.city.toLowerCase().includes(search) ||
      p.state.toLowerCase().includes(search)
    );
  }

  if (params.type) {
    filtered = filtered.filter(p => p.type === params.type);
  }

  if (params.city) {
    filtered = filtered.filter(p => p.city === params.city);
  }

  if (params.status) {
    filtered = filtered.filter(p => p.status === params.status);
  }

  if (params.minBeds) {
    filtered = filtered.filter(p => p.beds >= params.minBeds);
  }

  if (params.minPrice) {
    filtered = filtered.filter(p => p.price >= params.minPrice);
  }

  if (params.maxPrice) {
    filtered = filtered.filter(p => p.price <= params.maxPrice);
  }

  // Sorting
  if (params.sortBy) {
    const [field, order] = params.sortBy === 'newest' ? ['createdAt', 'desc'] :
      params.sortBy === 'price_asc' ? ['price', 'asc'] :
      params.sortBy === 'price_desc' ? ['price', 'desc'] :
      params.sortBy === 'sqft_desc' ? ['sqft', 'desc'] :
      params.sortBy === 'sqft_asc' ? ['sqft', 'asc'] : ['id', 'asc'];

    filtered.sort((a, b) => {
      let aVal = a[field], bVal = b[field];
      if (field === 'createdAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (order === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      } else {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
    });
  }

  // Pagination
  if (params.page) {
    const limit = params.limit || 9;
    const start = (params.page - 1) * limit;
    filtered = filtered.slice(start, start + limit);
  }

  return filtered;
};

export const getProperties = async (params = {}) => {
  const data = await getData();
  return filterProperties(data.properties, params);
};

export const getPropertyById = async (id) => {
  const data = await getData();
  return data.properties.find(p => p.id == id);
};

export const createProperty = async (data) => {
  // For demo, just return the data (no persistence in production)
  return { ...data, id: Date.now() };
};

export const updateProperty = async (id, data) => {
  // For demo, just return the data
  return { ...data, id };
};

export const deleteProperty = async (id) => {
  // For demo, just return true
  return true;
};
