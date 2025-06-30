-- Tours Table
CREATE TABLE tours (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  location TEXT DEFAULT 'Punta Cana',
  image_urls TEXT[], -- Array of image URLs
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tour_id BIGINT REFERENCES tours(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for 'tours' table
-- Allow public read access for all tours
CREATE POLICY "Public read access for tours"
ON tours
FOR SELECT
USING (true);

-- Allow admin users to insert, update, delete tours
-- (Assuming you have an 'admin' role or a way to identify admins)
-- This is a placeholder; actual admin role management will be needed.
CREATE POLICY "Admin access for tours"
ON tours
FOR ALL
USING (auth.role() = 'authenticated') -- Example: restrict to any logged-in user, refine for admin
WITH CHECK (auth.role() = 'authenticated'); -- Example: restrict to any logged-in user, refine for admin


-- Policies for 'reviews' table
-- Allow public read access for all reviews
CREATE POLICY "Public read access for reviews"
ON reviews
FOR SELECT
USING (true);

-- Allow authenticated users to insert their own reviews
CREATE POLICY "Authenticated users can insert reviews"
ON reviews
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own reviews (optional)
CREATE POLICY "Users can update their own reviews"
ON reviews
FOR UPDATE
USING (auth.uid() = (SELECT user_id FROM tours WHERE id = tour_id)) -- This assumes you store user_id on review, adjust if not
WITH CHECK (auth.uid() = (SELECT user_id FROM tours WHERE id = tour_id));

-- Allow users to delete their own reviews (optional)
CREATE POLICY "Users can delete their own reviews"
ON reviews
FOR DELETE
USING (auth.uid() = (SELECT user_id FROM tours WHERE id = tour_id)); -- This assumes you store user_id on review, adjust if not

-- Insert some sample data (optional, for testing)
-- INSERT INTO tours (name, description, price, image_urls) VALUES
--   ('Saona Island Paradise Getaway', 'Experience the breathtaking beauty of Saona Island. White sandy beaches, turquoise waters, and a day of relaxation and fun.', 120.00, ARRAY['https://example.com/saona1.jpg', 'https://example.com/saona2.jpg']),
--   ('Punta Cana Dune Buggy Adventure', 'Thrilling off-road dune buggy adventure through the Dominican countryside. Get ready for mud and excitement!', 85.50, ARRAY['https://example.com/buggy1.jpg']),
--   ('Catalina Island Snorkeling & Beach', 'Discover the underwater world of Catalina Island with a snorkeling tour, followed by beach relaxation.', 95.00, ARRAY['https://example.com/catalina1.jpg']);

-- INSERT INTO reviews (tour_id, user_name, rating, comment) VALUES
--   (1, 'John Doe', 5, 'Absolutely amazing! Saona is a must-see.'),
--   (1, 'Jane Smith', 4, 'Beautiful island, a bit crowded but worth it.'),
--   (2, 'Mike Brown', 5, 'So much fun! The buggies were a blast and the guides were great.');
