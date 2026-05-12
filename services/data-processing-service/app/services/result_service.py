import json
from datetime import UTC, datetime

from app.db.database import get_connection


def store_pipeline_output(run_id: str, payload: dict) -> dict:
    updated_at = datetime.now(UTC).isoformat()
    record = {"run_id": run_id, **payload, "updated_at": updated_at}

    with get_connection() as connection:
        connection.execute(
            "INSERT OR REPLACE INTO pipeline_outputs (run_id, simulation_output, analysis_output, updated_at) VALUES (?, ?, ?, ?)",
            (
                run_id,
                json.dumps(payload["simulation_output"]),
                json.dumps(payload["analysis_output"]),
                updated_at,
            ),
        )

    return record


def get_pipeline_run(run_id: str) -> dict | None:
    with get_connection() as connection:
        run_row = connection.execute(
            "SELECT run_id, processed_input, statistics, simulation_factor, created_at FROM pipeline_runs WHERE run_id = ?",
            (run_id,),
        ).fetchone()
        output_row = connection.execute(
            "SELECT simulation_output, analysis_output, updated_at FROM pipeline_outputs WHERE run_id = ?",
            (run_id,),
        ).fetchone()

    if not run_row:
        return None

    record = dict(run_row)
    record["cleaned_values"] = json.loads(record.pop("processed_input"))
    record["statistics"] = json.loads(record["statistics"])

    if output_row:
        output_record = dict(output_row)
        record["simulation_output"] = json.loads(output_record["simulation_output"])
        record["analysis_output"] = json.loads(output_record["analysis_output"])
        record["updated_at"] = output_record["updated_at"]

    return record
