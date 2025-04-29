# backend/db.py
from dotenv import load_dotenv
load_dotenv()

import os
import oracledb

pool = oracledb.create_pool(
    user=os.getenv("ORACLE_USER"),
    password=os.getenv("ORACLE_PASS"),
    dsn=os.getenv("ORACLE_DSN"),
    min=2, max=5, increment=1
)

def query_team_stats(view, conference, division, name, stat, order):
    stats_table = "tdelp.weekly_team_stats" if view == "weekly" else "tdelp.yearly_team_stats"
    team_table  = "tdelp.team"

    # always include season (and week for weekly), plus team_name, then either one stat or all
    if view == "weekly":
        if stat:
            select_clause = "s.season, s.week, t.name AS team_name, s." + stat
        else:
            select_clause = "s.season, s.week, t.name AS team_name, s.*"
    else:
        if stat:
            select_clause = "s.season, t.name AS team_name, s." + stat
        else:
            select_clause = "s.season, t.name AS team_name, s.*"

    sql = f"""
    SELECT {select_clause}
      FROM {team_table} t
      JOIN {stats_table} s ON t.team_id = s.team_id
     WHERE 1=1
    """
    params = {}
    if conference:
        sql += " AND t.conference = :conference"; params["conference"] = conference
    if division:
        sql += " AND t.division   = :division";   params["division"]   = division
    if name:
        sql += " AND LOWER(t.name) LIKE :name";    params["name"]       = f"%{name.lower()}%"

    # ordering: by chosen stat, else by season/week
    if stat:
        sql += f" ORDER BY s.{stat} {order.upper()}"
    else:
        if view == "weekly":
            sql += f" ORDER BY s.season {order.upper()}, s.week {order.upper()}"
        else:
            sql += f" ORDER BY s.season {order.upper()}"

    with pool.acquire() as conn, conn.cursor() as cur:
        cur.execute(sql, params)
        cols = [c[0].lower() for c in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]

def query_player_stats(view, position, conference, division, name, stat, order):
    stats_table  = "tdelp.weekly_player_stats" if view == "weekly" else "tdelp.yearly_player_stats"
    player_table = "tdelp.player"

    if view == "weekly":
        if stat:
            select_clause = "s.season, s.week, p.name AS player_name, p.position, s." + stat
        else:
            select_clause = "s.season, s.week, p.name AS player_name, p.position, s.*"
    else:
        if stat:
            select_clause = "s.season, p.name AS player_name, p.position, s." + stat
        else:
            select_clause = "s.season, p.name AS player_name, p.position, s.*"

    sql = f"""
    SELECT {select_clause}
      FROM {player_table} p
      JOIN {stats_table} s ON p.player_id = s.player_id
     WHERE 1=1
    """
    params = {}
    if position:
        sql += " AND p.position = :position";    params["position"]   = position
    if conference:
        sql += " AND p.team_id IN (SELECT team_id FROM tdelp.team WHERE conference = :conference)"
        params["conference"] = conference
    if division:
        sql += " AND p.team_id IN (SELECT team_id FROM tdelp.team WHERE division = :division)"
        params["division"]   = division
    if name:
        sql += " AND LOWER(p.name) LIKE :name";   params["name"]       = f"%{name.lower()}%"

    if stat:
        sql += f" ORDER BY s.{stat} {order.upper()}"
    else:
        if view == "weekly":
            sql += f" ORDER BY s.season {order.upper()}, s.week {order.upper()}"
        else:
            sql += f" ORDER BY s.season {order.upper()}"

    with pool.acquire() as conn, conn.cursor() as cur:
        cur.execute(sql, params)
        cols = [c[0].lower() for c in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]
