# View Tracking Schema Documentation

## Tables

### post_views
Stores individual view records with IP tracking and metadata.

| Column         | Type      | Description                               |
|---------------|-----------|-------------------------------------------|
| id            | UUID      | Primary key, auto-generated               |
| post_slug     | VARCHAR   | Blog post identifier                      |
| ip_address    | INET      | Visitor's IP address                      |
| user_agent    | TEXT      | Browser's user agent string               |
| viewed_at     | TIMESTAMP | When the view occurred                    |
| is_complete_view| BOOLEAN  | Whether viewer reached the bottom         |
| country_code  | VARCHAR(2)| Two-letter country code (if available)    |
| city          | VARCHAR   | City name (if available)                  |
| browser       | VARCHAR   | Browser name extracted from user agent    |
| os            | VARCHAR   | Operating system from user agent          |
| device        | VARCHAR   | Device type (mobile/desktop/tablet)       |

### post_view_counts
Aggregated view statistics for quick access.

| Column        | Type      | Description                               |
|--------------|-----------|-------------------------------------------|
| post_slug    | VARCHAR   | Primary key, blog post identifier         |
| total_views  | BIGINT    | Total number of views                     |
| unique_ips   | BIGINT    | Number of unique IP addresses             |
| last_updated | TIMESTAMP | Last time the counts were updated         |

## Views

### view_analytics
Provides aggregated analytics data per post.

- total_views: Total number of views
- unique_visitors: Count of unique IP addresses
- days_with_views: Number of distinct days with views
- last_viewed: Most recent view timestamp
- top_country: Most common country code
- top_browser: Most common browser
- top_os: Most common operating system

## Indexes
- idx_post_views_slug: Optimize queries by post_slug
- idx_post_views_ip: Optimize unique IP queries
- idx_post_views_timestamp: Optimize time-based queries
- idx_post_views_country: Optimize country-based analytics

## Triggers
- trigger_update_post_view_counts: Automatically updates aggregated statistics in post_view_counts when new views are recorded

## Usage Notes
1. All timestamps are stored with timezone information
2. IP addresses are stored using PostgreSQL's INET type for efficient storage and querying
3. The schema includes optional metadata fields that can be populated if available
4. Aggregated views are automatically maintained through triggers 