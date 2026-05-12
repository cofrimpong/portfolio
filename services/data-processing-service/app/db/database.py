import sqlite3
from contextlib import contextmanager
from collections.abc import Generator
from pathlib import Path

from app.core.config import settings


def _resolve_sqlite_path(database_url: str) -> Path:
    prefix = "sqlite:///"
    if not database_url.startswith(prefix):
        raise ValueError("Only sqlite URLs are supported in v1")
    return Path(database_url.removeprefix(prefix))


DB_PATH = _resolve_sqlite_path(settings.database_url)


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS pipeline_runs (
                run_id TEXT PRIMARY KEY,
                raw_input TEXT NOT NULL,
                processed_input TEXT NOT NULL,
                statistics TEXT NOT NULL,
                simulation_factor REAL NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS pipeline_outputs (
                run_id TEXT PRIMARY KEY,
                simulation_output TEXT NOT NULL,
                analysis_output TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS jobs (
                job_id TEXT PRIMARY KEY,
                request_id TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )


@contextmanager
def get_connection() -> Generator[sqlite3.Connection, None, None]:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()
