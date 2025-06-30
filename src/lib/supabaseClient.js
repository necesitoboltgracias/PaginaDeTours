import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env.local file (for Next.js)
// or your environment configuration.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch all tours
export const fetchAllTours = async () => {
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false }); // Optional: order by creation date

  if (error) {
    console.error('Error fetching tours:', error);
    throw error;
  }
  return data;
};

// Function to fetch a single tour by ID
export const fetchTourById = async (id) => {
  if (!id) throw new Error("Tour ID is required.");
  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .single(); // .single() expects exactly one row or throws error

  if (error) {
    console.error(`Error fetching tour with id ${id}:`, error);
    // It's common for .single() to error if no row is found, handle this gracefully
    if (error.code === 'PGRST116') return null; // PostgREST error for no rows found
    throw error;
  }
  return data;
};

// Function to fetch reviews for a specific tour
export const fetchReviewsForTour = async (tourId) => {
  if (!tourId) throw new Error("Tour ID is required to fetch reviews.");
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('tour_id', tourId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching reviews for tour ${tourId}:`, error);
    throw error;
  }
  return data;
};

// Function to add a new tour (admin functionality)
// Ensure RLS policies on Supabase allow this for authenticated users (or specific admin role)
export const addTour = async (tourData) => {
  // tourData should be an object matching the 'tours' table structure
  // e.g., { name, description, price, image_urls, location }
  const { data, error } = await supabase
    .from('tours')
    .insert([tourData])
    .select(); // .select() returns the inserted data

  if (error) {
    console.error('Error adding new tour:', error);
    throw error;
  }
  return data ? data[0] : null; // Return the newly created tour object
};

// Function to add a new review
// Ensure RLS policies on Supabase allow this for authenticated users
export const addReview = async (reviewData) => {
  // reviewData should be an object matching the 'reviews' table structure
  // e.g., { tour_id, user_name, rating, comment }
  const { data, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select(); // .select() returns the inserted data

  if (error) {
    console.error('Error adding new review:', error);
    throw error;
  }
  return data ? data[0] : null; // Return the newly created review object
};

// Example of how to use these functions in a component:
//
// import { fetchAllTours, addReview } from './lib/supabaseClient';
//
// useEffect(() => {
//   const getTours = async () => {
//     try {
//       const tours = await fetchAllTours();
//       setTours(tours);
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   getTours();
// }, []);
//
// const handleAddReview = async (newReview) => {
//   try {
//     const addedReview = await addReview(newReview);
//     // Update UI with the new review
//   } catch (error) {
//     // Handle error
//   }
// };
