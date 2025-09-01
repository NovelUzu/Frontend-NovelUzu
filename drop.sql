-- Script para eliminar completamente la base de datos NovelUzu
-- ADVERTENCIA: Este script eliminará TODOS los datos. Usar con precaución.

-- Desconectar todas las conexiones activas (opcional, requiere permisos de superusuario)
-- SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'noveluzu' AND pid <> pg_backend_pid();

-- Eliminar triggers primero
DROP TRIGGER IF EXISTS update_novel_stats_trigger ON chapters;
DROP TRIGGER IF EXISTS update_user_stats_trigger ON reading_history;
DROP TRIGGER IF EXISTS update_comment_count_trigger ON comments;
DROP TRIGGER IF EXISTS update_rating_stats_trigger ON ratings;
DROP TRIGGER IF EXISTS update_library_count_trigger ON user_library;
DROP TRIGGER IF EXISTS update_timestamps_users ON users;
DROP TRIGGER IF EXISTS update_timestamps_novels ON novels;
DROP TRIGGER IF EXISTS update_timestamps_chapters ON chapters;
DROP TRIGGER IF EXISTS update_timestamps_comments ON comments;

-- Eliminar funciones de trigger
DROP FUNCTION IF EXISTS update_novel_statistics();
DROP FUNCTION IF EXISTS update_user_statistics();
DROP FUNCTION IF EXISTS update_comment_count();
DROP FUNCTION IF EXISTS update_rating_statistics();
DROP FUNCTION IF EXISTS update_library_count();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Eliminar tablas en orden inverso de dependencias
DROP TABLE IF EXISTS system_config CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS premium_subscriptions CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS reading_history CASCADE;
DROP TABLE IF EXISTS user_library CASCADE;
DROP TABLE IF EXISTS novel_subscriptions CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS novel_genres CASCADE;
DROP TABLE IF EXISTS novels CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Eliminar tipos enumerados
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS novel_status CASCADE;
DROP TYPE IF EXISTS chapter_status CASCADE;
DROP TYPE IF EXISTS comment_status CASCADE;
DROP TYPE IF EXISTS report_status CASCADE;
DROP TYPE IF EXISTS report_type CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS subscription_status CASCADE;

-- Eliminar extensiones si fueron creadas específicamente para esta base de datos
-- DROP EXTENSION IF EXISTS "uuid-ossp";
-- DROP EXTENSION IF EXISTS "pgcrypto";

PRINT 'Base de datos NovelUzu eliminada completamente.';