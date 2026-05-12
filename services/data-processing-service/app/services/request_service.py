import json
from datetime import UTC, datetime

from app.db.database import get_connection


def process_input(run_id: str, payload: dict) -> dict:
    created_at = datetime.now(UTC).isoformat()
    cleaned_values = [float(value) for value in payload["input_data"]]
    statistics = {
        "count": len(cleaned_values),
        "min": min(cleaned_values),
        "max": max(cleaned_values),
        "average": sum(cleaned_values) / len(cleaned_values),
    }
    record = {
        "run_id": run_id,
        **payload,
        "cleaned_values": cleaned_values,
        "statistics": statistics,
        "created_at": created_at,
    }

    with get_connection() as connection:
        connection.execute(
            "INSERT INTO pipeline_runs (run_id, raw_input, processed_input, statistics, simulation_factor, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            (
                run_id,
                json.dumps(payload["input_data"]),
                json.dumps(cleaned_values),
                json.dumps(statistics),
                payload["simulation_factor"],
                created_at,
            ),
        )

    return record


def get_processed_run(run_id: str) -> dict | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT run_id, processed_input, statistics, simulation_factor, created_at FROM pipeline_runs WHERE run_id = ?",
            (run_id,),
        ).fetchone()

    if not row:
        return None

    record = dict(row)
    record["cleaned_values"] = json.loads(record.pop("processed_input"))
    record["statistics"] = json.loads(record["statistics"])
    return record
