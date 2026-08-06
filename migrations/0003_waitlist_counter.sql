CREATE TABLE IF NOT EXISTS waitlist_stats (
  metric TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0 CHECK (value >= 0)
);

INSERT INTO waitlist_stats (metric, value)
VALUES ('total', (SELECT COUNT(*) FROM waitlist_entries))
ON CONFLICT(metric) DO UPDATE SET value = excluded.value;

CREATE TRIGGER IF NOT EXISTS waitlist_entries_increment_total
AFTER INSERT ON waitlist_entries
BEGIN
  UPDATE waitlist_stats
  SET value = value + 1
  WHERE metric = 'total';
END;

CREATE TRIGGER IF NOT EXISTS waitlist_entries_decrement_total
AFTER DELETE ON waitlist_entries
BEGIN
  UPDATE waitlist_stats
  SET value = MAX(0, value - 1)
  WHERE metric = 'total';
END;
