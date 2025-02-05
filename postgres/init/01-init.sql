-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create post_views table
CREATE TABLE post_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_slug VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_complete_view BOOLEAN DEFAULT true,
    -- Additional metadata
    country_code VARCHAR(2),
    city VARCHAR(100),
    browser VARCHAR(100),
    os VARCHAR(100),
    device VARCHAR(100)
);

-- Create post_view_counts table for aggregated data
CREATE TABLE post_view_counts (
    post_slug VARCHAR(255) PRIMARY KEY,
    total_views BIGINT DEFAULT 0,
    unique_ips BIGINT DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_post_views_slug ON post_views(post_slug);
CREATE INDEX idx_post_views_ip ON post_views(ip_address);
CREATE INDEX idx_post_views_timestamp ON post_views(viewed_at);
CREATE INDEX idx_post_views_country ON post_views(country_code);

-- Create a function to update post_view_counts
CREATE OR REPLACE FUNCTION update_post_view_counts()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO post_view_counts (post_slug, total_views, unique_ips, last_updated)
    VALUES (NEW.post_slug, 1, 1, CURRENT_TIMESTAMP)
    ON CONFLICT (post_slug)
    DO UPDATE SET
        total_views = post_view_counts.total_views + 1,
        unique_ips = (
            SELECT COUNT(DISTINCT ip_address)
            FROM post_views
            WHERE post_slug = NEW.post_slug
        ),
        last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update post_view_counts
CREATE TRIGGER trigger_update_post_view_counts
AFTER INSERT ON post_views
FOR EACH ROW
EXECUTE FUNCTION update_post_view_counts();

-- Create view for analytics
CREATE VIEW view_analytics AS
SELECT 
    post_slug,
    COUNT(*) as total_views,
    COUNT(DISTINCT ip_address) as unique_visitors,
    COUNT(DISTINCT date_trunc('day', viewed_at)) as days_with_views,
    MAX(viewed_at) as last_viewed,
    MODE() WITHIN GROUP (ORDER BY country_code) as top_country,
    MODE() WITHIN GROUP (ORDER BY browser) as top_browser,
    MODE() WITHIN GROUP (ORDER BY os) as top_os
FROM post_views
GROUP BY post_slug; 