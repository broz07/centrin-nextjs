--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-05 17:53:32 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 3571 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3572 (class 0 OID 0)
-- Dependencies: 3571
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 6 (class 2615 OID 16388)
-- Name: centrin; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA centrin;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: buildings; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.buildings (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16393)
-- Name: corridors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.corridors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


--
-- TOC entry 229 (class 1259 OID 16415)
-- Name: floors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.floors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    building_id integer NOT NULL,
    floor_caregiver_id integer
);


--
-- TOC entry 247 (class 1259 OID 25002)
-- Name: all_corridors_joined; Type: VIEW; Schema: centrin; Owner: -
--

CREATE VIEW centrin.all_corridors_joined AS
 SELECT c.id,
    c.name,
    c.floor_id,
    f.name AS floor_name,
    f.building_id,
    b.name AS building_name
   FROM ((centrin.corridors c
     JOIN centrin.floors f ON ((c.floor_id = f.id)))
     JOIN centrin.buildings b ON ((f.building_id = b.id)))
  ORDER BY c.name;


--
-- TOC entry 223 (class 1259 OID 16397)
-- Name: defect_states; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defect_states (
    id integer NOT NULL,
    description character varying(255) NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 16401)
-- Name: defect_types; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defect_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 227 (class 1259 OID 16407)
-- Name: defects; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defects (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    info text,
    start_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp with time zone,
    solved boolean DEFAULT false,
    outdoor_id integer,
    room_id integer,
    corridor_id integer,
    severity_id integer DEFAULT 1 NOT NULL,
    created_by integer NOT NULL,
    assigned_to integer,
    solved_by integer,
    state_id integer DEFAULT 1 NOT NULL,
    type_id integer DEFAULT 3 NOT NULL,
    note text
);


--
-- TOC entry 231 (class 1259 OID 16419)
-- Name: outdoors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.outdoors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 235 (class 1259 OID 16431)
-- Name: rooms; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.rooms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


--
-- TOC entry 237 (class 1259 OID 16435)
-- Name: severity; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.severity (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 239 (class 1259 OID 16439)
-- Name: users; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.users (
    id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    username text NOT NULL,
    email text,
    password text NOT NULL,
    role_id integer NOT NULL,
    supervisor_id integer
);


--
-- TOC entry 255 (class 1259 OID 25368)
-- Name: all_defects_joined; Type: VIEW; Schema: centrin; Owner: -
--

CREATE VIEW centrin.all_defects_joined AS
 SELECT d.id,
    d.description,
    d.info,
    d.note,
    d.start_time,
    d.end_time,
    d.solved,
    d.outdoor_id,
    d.room_id,
    d.corridor_id,
    d.severity_id,
    d.created_by,
    d.assigned_to,
    d.solved_by,
    d.state_id,
    d.type_id,
    r.name AS room_name,
    c.name AS corridor_name,
    o.name AS outdoor_name,
    o.description AS outdoor_description,
    ds.description AS state_description,
    dt.name AS type_name,
    dt.description AS type_description,
    f.id AS floor_id,
    f.name AS floor_name,
    b.id AS building_id,
    b.name AS building_name,
    uc.username AS created_by_username,
    uc.name AS created_by_name,
    uc.surname AS created_by_surname,
    ua.username AS assigned_to_username,
    ua.name AS assigned_to_name,
    ua.surname AS assigned_to_surname,
    us.username AS solved_by_username,
    us.name AS solved_by_name,
    us.surname AS solved_by_surname,
    s.name AS severity
   FROM (((((((((((centrin.defects d
     LEFT JOIN centrin.users uc ON ((uc.id = d.created_by)))
     LEFT JOIN centrin.users ua ON ((ua.id = d.assigned_to)))
     LEFT JOIN centrin.users us ON ((us.id = d.solved_by)))
     LEFT JOIN centrin.defect_states ds ON ((ds.id = d.state_id)))
     LEFT JOIN centrin.defect_types dt ON ((dt.id = d.type_id)))
     LEFT JOIN centrin.severity s ON ((s.id = d.severity_id)))
     LEFT JOIN centrin.rooms r ON (((r.id = d.room_id) AND (d.corridor_id IS NULL) AND (d.outdoor_id IS NULL))))
     LEFT JOIN centrin.corridors c ON (((c.id = d.corridor_id) AND (d.room_id IS NULL) AND (d.outdoor_id IS NULL))))
     LEFT JOIN centrin.outdoors o ON (((o.id = d.outdoor_id) AND (d.room_id IS NULL) AND (d.corridor_id IS NULL))))
     LEFT JOIN centrin.floors f ON ((((r.floor_id = f.id) AND (d.room_id IS NOT NULL)) OR ((c.floor_id = f.id) AND (d.corridor_id IS NOT NULL)))))
     LEFT JOIN centrin.buildings b ON ((f.building_id = b.id)));


--
-- TOC entry 251 (class 1259 OID 25324)
-- Name: all_login_logs_joined; Type: VIEW; Schema: centrin; Owner: -
--

CREATE VIEW centrin.all_login_logs_joined AS
SELECT
    NULL::bigint AS count,
    NULL::timestamp with time zone AS first_login,
    NULL::timestamp with time zone AS last_login,
    NULL::integer AS user_id,
    NULL::text AS username,
    NULL::text AS name,
    NULL::text AS surname,
    NULL::integer AS role_id,
    NULL::text AS role_name,
    NULL::text AS role_description;


--
-- TOC entry 248 (class 1259 OID 25006)
-- Name: all_rooms_joined; Type: VIEW; Schema: centrin; Owner: -
--

CREATE VIEW centrin.all_rooms_joined AS
 SELECT r.id,
    r.name,
    r.floor_id,
    f.name AS floor_name,
    f.building_id,
    b.name AS building_name
   FROM ((centrin.rooms r
     JOIN centrin.floors f ON ((r.floor_id = f.id)))
     JOIN centrin.buildings b ON ((f.building_id = b.id)));


--
-- TOC entry 252 (class 1259 OID 25330)
-- Name: defects_workplans_association; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defects_workplans_association (
    defect_id integer NOT NULL,
    workplan_year integer NOT NULL,
    workplan_week integer NOT NULL
);


--
-- TOC entry 253 (class 1259 OID 25333)
-- Name: workplans; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.workplans (
    workplan_year integer NOT NULL,
    workplan_week integer NOT NULL
);


--
-- TOC entry 254 (class 1259 OID 25347)
-- Name: all_workplans_joined; Type: VIEW; Schema: centrin; Owner: -
--

CREATE VIEW centrin.all_workplans_joined AS
 SELECT d.id,
    d.description,
    d.info,
    d.note,
    d.start_time,
    d.end_time,
    d.solved,
    d.outdoor_id,
    d.room_id,
    d.corridor_id,
    d.severity_id,
    d.created_by,
    d.assigned_to,
    d.solved_by,
    d.state_id,
    d.type_id,
    r.name AS room_name,
    c.name AS corridor_name,
    o.name AS outdoor_name,
    o.description AS outdoor_description,
    ds.description AS state_description,
    dt.name AS type_name,
    dt.description AS type_description,
    f.id AS floor_id,
    f.name AS floor_name,
    b.id AS building_id,
    b.name AS building_name,
    uc.username AS created_by_username,
    uc.name AS created_by_name,
    uc.surname AS created_by_surname,
    ua.username AS assigned_to_username,
    ua.name AS assigned_to_name,
    ua.surname AS assigned_to_surname,
    us.username AS solved_by_username,
    us.name AS solved_by_name,
    us.surname AS solved_by_surname,
    s.name AS severity,
    w.workplan_year,
    w.workplan_week
   FROM (((((((((((((centrin.defects d
     LEFT JOIN centrin.users uc ON ((uc.id = d.created_by)))
     LEFT JOIN centrin.users ua ON ((ua.id = d.assigned_to)))
     LEFT JOIN centrin.users us ON ((us.id = d.solved_by)))
     LEFT JOIN centrin.defect_states ds ON ((ds.id = d.state_id)))
     LEFT JOIN centrin.defect_types dt ON ((dt.id = d.type_id)))
     LEFT JOIN centrin.severity s ON ((s.id = d.severity_id)))
     LEFT JOIN centrin.rooms r ON (((r.id = d.room_id) AND (d.corridor_id IS NULL) AND (d.outdoor_id IS NULL))))
     LEFT JOIN centrin.corridors c ON (((c.id = d.corridor_id) AND (d.room_id IS NULL) AND (d.outdoor_id IS NULL))))
     LEFT JOIN centrin.outdoors o ON (((o.id = d.outdoor_id) AND (d.room_id IS NULL) AND (d.corridor_id IS NULL))))
     LEFT JOIN centrin.floors f ON ((((r.floor_id = f.id) AND (d.room_id IS NOT NULL)) OR ((c.floor_id = f.id) AND (d.corridor_id IS NOT NULL)))))
     LEFT JOIN centrin.buildings b ON ((f.building_id = b.id)))
     JOIN centrin.defects_workplans_association dwa ON ((d.id = dwa.defect_id)))
     JOIN centrin.workplans w ON (((dwa.workplan_year = w.workplan_year) AND (dwa.workplan_week = w.workplan_week))));


--
-- TOC entry 220 (class 1259 OID 16392)
-- Name: buildings_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.buildings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3573 (class 0 OID 0)
-- Dependencies: 220
-- Name: buildings_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.buildings_id_seq OWNED BY centrin.buildings.id;


--
-- TOC entry 222 (class 1259 OID 16396)
-- Name: corridors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.corridors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3574 (class 0 OID 0)
-- Dependencies: 222
-- Name: corridors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.corridors_id_seq OWNED BY centrin.corridors.id;


--
-- TOC entry 224 (class 1259 OID 16400)
-- Name: defect_states_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.defect_states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3575 (class 0 OID 0)
-- Dependencies: 224
-- Name: defect_states_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defect_states_id_seq OWNED BY centrin.defect_states.id;


--
-- TOC entry 226 (class 1259 OID 16406)
-- Name: defect_types_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.defect_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3576 (class 0 OID 0)
-- Dependencies: 226
-- Name: defect_types_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defect_types_id_seq OWNED BY centrin.defect_types.id;


--
-- TOC entry 228 (class 1259 OID 16414)
-- Name: defects_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.defects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3577 (class 0 OID 0)
-- Dependencies: 228
-- Name: defects_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defects_id_seq OWNED BY centrin.defects.id;


--
-- TOC entry 230 (class 1259 OID 16418)
-- Name: floors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.floors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3578 (class 0 OID 0)
-- Dependencies: 230
-- Name: floors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.floors_id_seq OWNED BY centrin.floors.id;


--
-- TOC entry 250 (class 1259 OID 25229)
-- Name: login_logs; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.login_logs (
    id integer NOT NULL,
    "time" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id integer NOT NULL
);


--
-- TOC entry 249 (class 1259 OID 25228)
-- Name: login_logs_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.login_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3579 (class 0 OID 0)
-- Dependencies: 249
-- Name: login_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.login_logs_id_seq OWNED BY centrin.login_logs.id;


--
-- TOC entry 232 (class 1259 OID 16424)
-- Name: outdoors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.outdoors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3580 (class 0 OID 0)
-- Dependencies: 232
-- Name: outdoors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.outdoors_id_seq OWNED BY centrin.outdoors.id;


--
-- TOC entry 233 (class 1259 OID 16425)
-- Name: roles; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.roles (
    id integer NOT NULL,
    name text,
    description text
);


--
-- TOC entry 234 (class 1259 OID 16430)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3581 (class 0 OID 0)
-- Dependencies: 234
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.roles_id_seq OWNED BY centrin.roles.id;


--
-- TOC entry 236 (class 1259 OID 16434)
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 236
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.rooms_id_seq OWNED BY centrin.rooms.id;


--
-- TOC entry 238 (class 1259 OID 16438)
-- Name: severity_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.severity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 238
-- Name: severity_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.severity_id_seq OWNED BY centrin.severity.id;


--
-- TOC entry 240 (class 1259 OID 16444)
-- Name: users_id_seq; Type: SEQUENCE; Schema: centrin; Owner: -
--

CREATE SEQUENCE centrin.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.users_id_seq OWNED BY centrin.users.id;


--
-- TOC entry 3319 (class 2604 OID 16445)
-- Name: buildings id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings ALTER COLUMN id SET DEFAULT nextval('centrin.buildings_id_seq'::regclass);


--
-- TOC entry 3320 (class 2604 OID 16446)
-- Name: corridors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors ALTER COLUMN id SET DEFAULT nextval('centrin.corridors_id_seq'::regclass);


--
-- TOC entry 3321 (class 2604 OID 16447)
-- Name: defect_states id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states ALTER COLUMN id SET DEFAULT nextval('centrin.defect_states_id_seq'::regclass);


--
-- TOC entry 3322 (class 2604 OID 16448)
-- Name: defect_types id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types ALTER COLUMN id SET DEFAULT nextval('centrin.defect_types_id_seq'::regclass);


--
-- TOC entry 3323 (class 2604 OID 16449)
-- Name: defects id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects ALTER COLUMN id SET DEFAULT nextval('centrin.defects_id_seq'::regclass);


--
-- TOC entry 3329 (class 2604 OID 16450)
-- Name: floors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors ALTER COLUMN id SET DEFAULT nextval('centrin.floors_id_seq'::regclass);


--
-- TOC entry 3335 (class 2604 OID 25232)
-- Name: login_logs id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.login_logs ALTER COLUMN id SET DEFAULT nextval('centrin.login_logs_id_seq'::regclass);


--
-- TOC entry 3330 (class 2604 OID 16451)
-- Name: outdoors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors ALTER COLUMN id SET DEFAULT nextval('centrin.outdoors_id_seq'::regclass);


--
-- TOC entry 3331 (class 2604 OID 16452)
-- Name: roles id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.roles ALTER COLUMN id SET DEFAULT nextval('centrin.roles_id_seq'::regclass);


--
-- TOC entry 3332 (class 2604 OID 16453)
-- Name: rooms id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms ALTER COLUMN id SET DEFAULT nextval('centrin.rooms_id_seq'::regclass);


--
-- TOC entry 3333 (class 2604 OID 16454)
-- Name: severity id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity ALTER COLUMN id SET DEFAULT nextval('centrin.severity_id_seq'::regclass);


--
-- TOC entry 3334 (class 2604 OID 16455)
-- Name: users id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users ALTER COLUMN id SET DEFAULT nextval('centrin.users_id_seq'::regclass);


--
-- TOC entry 3540 (class 0 OID 16389)
-- Dependencies: 219
-- Data for Name: buildings; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.buildings VALUES (1, 'Pavilon A');
INSERT INTO centrin.buildings VALUES (2, 'Pavilon B');
INSERT INTO centrin.buildings VALUES (3, 'Budova TKB');


--
-- TOC entry 3542 (class 0 OID 16393)
-- Dependencies: 221
-- Data for Name: corridors; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.corridors VALUES (1, 'Chodba', 1);
INSERT INTO centrin.corridors VALUES (2, 'Chodba', 2);
INSERT INTO centrin.corridors VALUES (3, 'Chodba', 3);
INSERT INTO centrin.corridors VALUES (4, 'Chodba', 4);
INSERT INTO centrin.corridors VALUES (5, 'Chodba', 5);
INSERT INTO centrin.corridors VALUES (6, 'Chodba', 6);
INSERT INTO centrin.corridors VALUES (7, 'Chodba', 7);
INSERT INTO centrin.corridors VALUES (8, 'Chodba', 8);
INSERT INTO centrin.corridors VALUES (9, 'Chodba', 9);
INSERT INTO centrin.corridors VALUES (10, 'Chodba', 10);
INSERT INTO centrin.corridors VALUES (11, 'Chodba', 11);
INSERT INTO centrin.corridors VALUES (12, 'Chodba', 12);
INSERT INTO centrin.corridors VALUES (13, 'Chodba', 13);
INSERT INTO centrin.corridors VALUES (14, 'Chodba', 14);


--
-- TOC entry 3544 (class 0 OID 16397)
-- Dependencies: 223
-- Data for Name: defect_states; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.defect_states VALUES (2, 'V řešení');
INSERT INTO centrin.defect_states VALUES (3, 'Odloženo');
INSERT INTO centrin.defect_states VALUES (5, 'Výměna za nové');
INSERT INTO centrin.defect_states VALUES (7, 'Zařízen servis');
INSERT INTO centrin.defect_states VALUES (8, 'Zrušeno');
INSERT INTO centrin.defect_states VALUES (1, 'Vytvořeno');
INSERT INTO centrin.defect_states VALUES (4, 'Nelze vyřešit');
INSERT INTO centrin.defect_states VALUES (6, 'Vyřešeno');


--
-- TOC entry 3546 (class 0 OID 16401)
-- Dependencies: 225
-- Data for Name: defect_types; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.defect_types VALUES (1, 'Pravidelná údržba', NULL);
INSERT INTO centrin.defect_types VALUES (2, 'Úklid', NULL);
INSERT INTO centrin.defect_types VALUES (3, 'Závada', NULL);
INSERT INTO centrin.defect_types VALUES (4, 'Plánovaná práce', NULL);


--
-- TOC entry 3548 (class 0 OID 16407)
-- Dependencies: 227
-- Data for Name: defects; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.defects VALUES (18, 'test', NULL, '2023-08-22 09:53:50.355506+00', '2023-08-22 09:55:03.264006+00', true, NULL, 137, NULL, 5, 1, NULL, 1, 8, 3, 'test');
INSERT INTO centrin.defects VALUES (11, 'Nepojízdný vozík', NULL, '2023-08-21 15:25:40.978482+00', '2023-08-22 09:56:01.964967+00', true, NULL, 51, NULL, 2, 1, 12, 1, 6, 3, NULL);
INSERT INTO centrin.defects VALUES (10, 'Rozbitý obraz', NULL, '2023-08-21 15:24:50.803942+00', '2023-08-22 09:57:17.270987+00', true, NULL, NULL, 11, 3, 1, 1, 1, 4, 3, 'nelze');
INSERT INTO centrin.defects VALUES (19, 'Nedopalky', NULL, '2023-08-22 09:58:40.681046+00', NULL, false, 4, NULL, NULL, 5, 1, NULL, NULL, 1, 2, NULL);
INSERT INTO centrin.defects VALUES (20, 'Prasklá zeď', 'Na pravé zdi, od futer až k oknu.', '2023-08-22 18:00:37.272311+00', '2023-08-22 18:02:49.853907+00', true, NULL, 63, NULL, 5, 1, 22, 22, 6, 3, 'Prasklina zadělána');
INSERT INTO centrin.defects VALUES (21, 'Nefunkční postel', NULL, '2023-08-22 18:03:35.854605+00', '2023-08-22 18:04:05.094511+00', true, NULL, 70, NULL, 4, 17, NULL, 17, 8, 3, 'Planý poplach');
INSERT INTO centrin.defects VALUES (15, 'Nesprávný záznam', 'Toto je příkladový nesprávný záznam na zrušení', '2023-08-22 04:56:21.060625+00', '2023-08-22 04:56:37.861411+00', true, NULL, 70, NULL, 5, 12, NULL, 12, 8, 3, 'Testování zrušení');
INSERT INTO centrin.defects VALUES (16, 'Nedopalky', NULL, '2023-08-22 05:07:43.468038+00', '2023-08-22 05:15:57.721835+00', true, 4, NULL, NULL, 1, 12, NULL, 12, 8, 2, 'Neúplné zadání');
INSERT INTO centrin.defects VALUES (4, 'Rozbitá žárovka', NULL, '2023-08-17 14:55:25.743625+00', '2023-08-22 06:17:40.084213+00', true, NULL, 1, NULL, 1, 1, 22, 22, 5, 3, 'Nová žárovka odepsána ze skladu');
INSERT INTO centrin.defects VALUES (7, 'Ucpaný záchod', 'V kavárně jsou ucpané dámské záchody', '2023-08-21 06:37:55.851557+00', '2023-08-22 06:18:56.913813+00', true, 5, NULL, NULL, 4, 1, 22, 22, 6, 3, NULL);
INSERT INTO centrin.defects VALUES (14, 'Protéká WC', NULL, '2023-08-21 17:00:08.608315+00', '2023-08-22 06:42:14.612873+00', true, NULL, 56, NULL, 3, 17, 12, 22, 6, 3, NULL);
INSERT INTO centrin.defects VALUES (9, 'Louže', 'Udělala se nám louže', '2023-08-21 11:36:45.078673+00', '2023-08-22 06:43:48.764253+00', true, NULL, 128, NULL, 5, 1, 27, 27, 6, 2, NULL);
INSERT INTO centrin.defects VALUES (23, 'Nesprávný alarm', NULL, '2023-08-22 20:12:27.743826+00', '2023-08-22 20:12:42.641385+00', true, 4, NULL, NULL, 1, 1, NULL, 1, 8, 3, 'Testovací záznam');
INSERT INTO centrin.defects VALUES (45, 'Nakrmit ryby', NULL, '2024-01-05 10:50:52.601568+00', NULL, false, 1, NULL, NULL, 4, 1, NULL, NULL, 1, 1, NULL);
INSERT INTO centrin.defects VALUES (29, 'Rozbité okno', 'gjkdfbhglihsdfligsdfohjsůodfjh ghshsdfhsfdhsdh', '2023-08-24 06:01:11.994329+00', '2023-08-24 06:04:49.566839+00', true, NULL, 39, NULL, 5, 1, 1, 12, 7, 3, 'test');
INSERT INTO centrin.defects VALUES (39, 'Napustit', 'Napustit bazén', '2023-08-29 09:47:42.821017+00', '2024-01-05 15:27:13.453288+00', true, 1, NULL, NULL, 5, 1, 54, 12, 6, 1, NULL);
INSERT INTO centrin.defects VALUES (5, 'Ucpaný záchod', NULL, '2023-08-18 11:36:19.349724+00', NULL, false, NULL, 70, NULL, 3, 22, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (8, 'Rozbité umyvadlo', NULL, '2023-08-21 06:40:50.303447+00', NULL, false, NULL, 128, NULL, 4, 1, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (22, 'Utopila se ryba', NULL, '2023-08-24 06:03:10.680214+00', NULL, false, 1, NULL, NULL, 2, 1, NULL, NULL, 3, 3, NULL);
INSERT INTO centrin.defects VALUES (26, 'Nedopalky', NULL, '2023-08-23 12:31:34.58946+00', '2023-08-23 12:58:58.862007+00', true, 4, NULL, NULL, 1, 1, NULL, 1, 8, 3, 'Duplicita');
INSERT INTO centrin.defects VALUES (25, 'Nedopalky', NULL, '2023-08-23 12:30:40.99033+00', '2023-08-23 12:59:16.053979+00', true, 4, NULL, NULL, 1, 1, NULL, 1, 8, 3, 'Duplicita');
INSERT INTO centrin.defects VALUES (31, 'Malování místnosti', NULL, '2023-08-25 10:25:39.638846+00', '2023-08-25 12:29:29.492567+00', true, NULL, 52, NULL, 2, 1, 1, 1, 6, 4, NULL);
INSERT INTO centrin.defects VALUES (27, 'Nedopalky', NULL, '2023-08-23 13:00:17.883388+00', NULL, false, 4, NULL, NULL, 2, 1, NULL, NULL, 3, 3, NULL);
INSERT INTO centrin.defects VALUES (28, 'Rozbité okno', 'Na levé straně', '2023-08-23 13:46:02.510026+00', NULL, false, NULL, 48, NULL, 5, 12, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (36, 'Vymalovat chodbu TKB', NULL, '2023-08-25 22:04:52.76931+00', NULL, false, NULL, NULL, 12, 2, 1, 1, NULL, 1, 1, NULL);
INSERT INTO centrin.defects VALUES (34, 'Vymalovat místnost', NULL, '2023-08-25 14:17:40.616095+00', NULL, false, NULL, 39, NULL, 3, 1, 12, NULL, 1, 1, NULL);
INSERT INTO centrin.defects VALUES (33, 'Posekat trávu', NULL, '2023-08-25 14:09:49.097774+00', NULL, false, 3, NULL, NULL, 4, 1, 12, NULL, 1, 4, NULL);
INSERT INTO centrin.defects VALUES (6, 'Prasklá podlaha', 'Je nutno opravit podlahu, aby se klienti nezranili', '2023-12-18 11:41:46.186+00', NULL, false, NULL, NULL, 4, 5, 19, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (32, 'Vyčistit bazén', NULL, '2023-08-25 12:42:55.445904+00', '2023-08-29 08:46:21.146354+00', true, 1, NULL, NULL, 2, 1, 57, 1, 6, 4, NULL);
INSERT INTO centrin.defects VALUES (24, 'Vypadly všechny knihy', 'V knihovně popadaly všechny knihy z polic', '2023-12-23 11:47:30.625+00', NULL, false, NULL, 33, NULL, 4, 1, NULL, NULL, 1, 2, NULL);
INSERT INTO centrin.defects VALUES (35, 'Vymalovat chodbu', NULL, '2023-08-25 21:53:34.283234+00', NULL, false, NULL, NULL, 11, 5, 1, 1, NULL, 2, 4, NULL);
INSERT INTO centrin.defects VALUES (12, 'Prasklé potrubí', 'Pod chodníkem prasklo potrubí', '2023-12-10 15:37:50.988+00', NULL, false, 1, NULL, NULL, 5, 1, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (37, 'Zazdít okno', NULL, '2023-08-29 09:29:53.551924+00', NULL, false, NULL, 33, NULL, 3, 1, 55, NULL, 1, 4, NULL);
INSERT INTO centrin.defects VALUES (47, 'Protéká záchod', NULL, '2024-01-05 10:52:25.481519+00', NULL, false, NULL, 119, NULL, 4, 1, 12, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (51, 'Uklidit voliéru', NULL, '2024-01-05 12:55:50.37659+00', '2024-01-05 14:07:12.409537+00', true, NULL, NULL, 2, 1, 1, 12, 12, 6, 2, NULL);
INSERT INTO centrin.defects VALUES (49, 'Vyměnit baterii v hodinách', NULL, '2024-01-05 12:55:01.797222+00', '2024-01-05 14:07:19.636444+00', true, NULL, NULL, 3, 2, 1, 12, 12, 5, 1, NULL);
INSERT INTO centrin.defects VALUES (48, 'Vyměnit baterii v hodinách', NULL, '2024-01-05 12:54:30.508719+00', '2024-01-05 14:07:28.034027+00', true, NULL, NULL, 11, 2, 1, 12, 12, 5, 1, NULL);
INSERT INTO centrin.defects VALUES (38, 'Vymalovat místnost', NULL, '2023-08-29 09:42:16.038308+00', NULL, false, NULL, 31, NULL, 2, 1, 57, NULL, 1, 1, NULL);
INSERT INTO centrin.defects VALUES (41, 'Uklidit nedopalky', NULL, '2024-01-05 10:48:14.450403+00', NULL, false, 4, NULL, NULL, 4, 3, NULL, NULL, 1, 2, NULL);
INSERT INTO centrin.defects VALUES (42, 'Uklidit rozsypané střepy', NULL, '2024-01-05 10:49:00.82012+00', NULL, false, NULL, NULL, 14, 2, 3, NULL, NULL, 1, 2, NULL);
INSERT INTO centrin.defects VALUES (44, 'Posypat chodník', 'Je nutné posypat chodník posypovou solí', '2024-01-05 10:50:18.379463+00', NULL, false, 2, NULL, NULL, 3, 3, NULL, NULL, 1, 3, NULL);
INSERT INTO centrin.defects VALUES (50, 'Vyměnit baterii v hodinách', NULL, '2024-01-05 12:55:23.026273+00', '2024-01-05 14:07:35.732861+00', true, NULL, NULL, 2, 2, 1, 12, 12, 5, 1, NULL);
INSERT INTO centrin.defects VALUES (46, 'Ostříhat kytky', NULL, '2024-01-05 10:51:33.558666+00', '2024-01-05 14:08:09.625078+00', true, 3, NULL, NULL, 3, 1, 12, 12, 7, 4, 'Zařízeno');
INSERT INTO centrin.defects VALUES (40, 'Rozbitý mobil', NULL, '2024-01-05 10:47:48.26965+00', NULL, false, NULL, 73, NULL, 2, 3, 12, NULL, 3, 3, NULL);
INSERT INTO centrin.defects VALUES (13, 'Rozbitá lampička', NULL, '2023-12-21 15:42:55.291+00', '2024-01-05 14:09:43.853076+00', true, NULL, 74, NULL, 2, 1, 1, 1, 4, 2, 'Rozbité');
INSERT INTO centrin.defects VALUES (43, 'Rozbité dveře u lednice', NULL, '2024-01-05 10:49:25.159063+00', '2024-01-05 14:48:25.395276+00', true, 5, NULL, NULL, 5, 3, 12, 12, 4, 3, 'Nelze opravit');


--
-- TOC entry 3564 (class 0 OID 25330)
-- Dependencies: 252
-- Data for Name: defects_workplans_association; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.defects_workplans_association VALUES (32, 2023, 34);
INSERT INTO centrin.defects_workplans_association VALUES (33, 2023, 34);
INSERT INTO centrin.defects_workplans_association VALUES (31, 2023, 34);
INSERT INTO centrin.defects_workplans_association VALUES (32, 2023, 35);
INSERT INTO centrin.defects_workplans_association VALUES (33, 2023, 35);
INSERT INTO centrin.defects_workplans_association VALUES (39, 2023, 36);
INSERT INTO centrin.defects_workplans_association VALUES (38, 2023, 36);
INSERT INTO centrin.defects_workplans_association VALUES (39, 2023, 40);
INSERT INTO centrin.defects_workplans_association VALUES (38, 2023, 40);
INSERT INTO centrin.defects_workplans_association VALUES (37, 2023, 40);
INSERT INTO centrin.defects_workplans_association VALUES (38, 2023, 51);
INSERT INTO centrin.defects_workplans_association VALUES (37, 2023, 51);
INSERT INTO centrin.defects_workplans_association VALUES (39, 2024, 1);
INSERT INTO centrin.defects_workplans_association VALUES (38, 2024, 1);
INSERT INTO centrin.defects_workplans_association VALUES (37, 2024, 1);


--
-- TOC entry 3550 (class 0 OID 16415)
-- Dependencies: 229
-- Data for Name: floors; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.floors VALUES (1, 'Podzemí', 1, NULL);
INSERT INTO centrin.floors VALUES (2, 'Přízemí', 1, NULL);
INSERT INTO centrin.floors VALUES (3, '1. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (4, '2. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (5, '3. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (6, '4. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (7, '5. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (8, '6. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (9, '7. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (10, '8. patro', 1, NULL);
INSERT INTO centrin.floors VALUES (11, 'Přízemí', 2, NULL);
INSERT INTO centrin.floors VALUES (12, 'Přízemí', 3, NULL);
INSERT INTO centrin.floors VALUES (13, '1. patro', 3, NULL);
INSERT INTO centrin.floors VALUES (14, '2. patro', 3, NULL);


--
-- TOC entry 3563 (class 0 OID 25229)
-- Dependencies: 250
-- Data for Name: login_logs; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.login_logs VALUES (1, '2023-08-23 20:19:07.714297+00', 22);
INSERT INTO centrin.login_logs VALUES (2, '2023-08-23 20:23:12.48559+00', 1);
INSERT INTO centrin.login_logs VALUES (3, '2023-08-23 20:23:18.204581+00', 1);
INSERT INTO centrin.login_logs VALUES (4, '2023-08-23 20:23:33.384903+00', 27);
INSERT INTO centrin.login_logs VALUES (5, '2023-08-23 20:23:40.334358+00', 17);
INSERT INTO centrin.login_logs VALUES (6, '2023-08-23 20:23:45.942645+00', 1);
INSERT INTO centrin.login_logs VALUES (7, '2023-08-23 20:39:01.422087+00', 1);
INSERT INTO centrin.login_logs VALUES (8, '2023-08-24 05:05:08.560917+00', 1);
INSERT INTO centrin.login_logs VALUES (9, '2023-08-24 05:57:00.632047+00', 1);
INSERT INTO centrin.login_logs VALUES (10, '2023-08-24 06:03:34.500217+00', 12);
INSERT INTO centrin.login_logs VALUES (11, '2023-08-24 06:05:43.59157+00', 1);
INSERT INTO centrin.login_logs VALUES (12, '2023-08-24 08:33:54.492826+00', 1);
INSERT INTO centrin.login_logs VALUES (13, '2023-08-24 11:47:29.297496+00', 1);
INSERT INTO centrin.login_logs VALUES (14, '2023-08-24 11:48:44.742513+00', 53);
INSERT INTO centrin.login_logs VALUES (15, '2023-08-24 11:50:56.752937+00', 1);
INSERT INTO centrin.login_logs VALUES (16, '2023-08-24 12:40:56.393305+00', 1);
INSERT INTO centrin.login_logs VALUES (17, '2023-08-24 12:57:10.544497+00', 1);
INSERT INTO centrin.login_logs VALUES (18, '2023-08-24 14:12:01.959486+00', 1);
INSERT INTO centrin.login_logs VALUES (19, '2023-08-24 14:12:36.502772+00', 1);
INSERT INTO centrin.login_logs VALUES (20, '2023-08-24 14:13:05.057163+00', 1);
INSERT INTO centrin.login_logs VALUES (21, '2023-08-24 17:52:15.820746+00', 1);
INSERT INTO centrin.login_logs VALUES (22, '2023-08-24 17:57:44.898303+00', 1);
INSERT INTO centrin.login_logs VALUES (23, '2023-08-25 14:14:12.427451+00', 1);
INSERT INTO centrin.login_logs VALUES (24, '2023-08-25 18:55:04.103605+00', 1);
INSERT INTO centrin.login_logs VALUES (25, '2023-08-27 09:27:01.662277+00', 1);
INSERT INTO centrin.login_logs VALUES (26, '2023-08-29 07:20:38.436149+00', 1);
INSERT INTO centrin.login_logs VALUES (27, '2023-08-29 12:13:50.870307+00', 1);
INSERT INTO centrin.login_logs VALUES (28, '2023-10-08 09:29:24.04556+00', 1);
INSERT INTO centrin.login_logs VALUES (29, '2023-12-19 16:51:02.244438+00', 1);
INSERT INTO centrin.login_logs VALUES (30, '2023-12-19 17:00:17.201506+00', 1);
INSERT INTO centrin.login_logs VALUES (31, '2023-12-19 17:04:13.070112+00', 1);
INSERT INTO centrin.login_logs VALUES (32, '2023-12-19 20:14:16.582443+00', 1);
INSERT INTO centrin.login_logs VALUES (33, '2023-12-19 20:48:29.900942+00', 1);
INSERT INTO centrin.login_logs VALUES (34, '2023-12-19 21:13:41.748631+00', 1);
INSERT INTO centrin.login_logs VALUES (35, '2023-12-20 16:25:30.439833+00', 1);
INSERT INTO centrin.login_logs VALUES (36, '2024-01-03 11:06:14.055719+00', 1);
INSERT INTO centrin.login_logs VALUES (37, '2024-01-03 11:38:04.055538+00', 1);
INSERT INTO centrin.login_logs VALUES (38, '2024-01-03 16:26:04.978462+00', 3);
INSERT INTO centrin.login_logs VALUES (39, '2024-01-03 20:25:02.073548+00', 1);
INSERT INTO centrin.login_logs VALUES (40, '2024-01-03 22:27:27.953269+00', 3);
INSERT INTO centrin.login_logs VALUES (41, '2024-01-03 22:27:38.195931+00', 1);
INSERT INTO centrin.login_logs VALUES (42, '2024-01-04 10:34:18.678202+00', 1);
INSERT INTO centrin.login_logs VALUES (43, '2024-01-04 10:35:19.316746+00', 3);
INSERT INTO centrin.login_logs VALUES (44, '2024-01-04 10:35:49.080102+00', 1);
INSERT INTO centrin.login_logs VALUES (45, '2024-01-05 10:47:05.132822+00', 1);
INSERT INTO centrin.login_logs VALUES (46, '2024-01-05 10:47:19.661813+00', 3);
INSERT INTO centrin.login_logs VALUES (47, '2024-01-05 10:50:23.231236+00', 1);
INSERT INTO centrin.login_logs VALUES (48, '2024-01-05 14:06:20.971183+00', 1);
INSERT INTO centrin.login_logs VALUES (49, '2024-01-05 14:06:53.485057+00', 12);
INSERT INTO centrin.login_logs VALUES (50, '2024-01-05 14:08:37.360019+00', 1);
INSERT INTO centrin.login_logs VALUES (51, '2024-01-05 14:48:03.271063+00', 12);
INSERT INTO centrin.login_logs VALUES (52, '2024-01-05 14:48:34.415694+00', 1);
INSERT INTO centrin.login_logs VALUES (53, '2024-01-05 15:26:16.511631+00', 1);
INSERT INTO centrin.login_logs VALUES (54, '2024-01-05 15:26:35.606203+00', 12);


--
-- TOC entry 3552 (class 0 OID 16419)
-- Dependencies: 231
-- Data for Name: outdoors; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.outdoors VALUES (1, 'U bazénu', NULL);
INSERT INTO centrin.outdoors VALUES (2, 'Před hlavní budovou', NULL);
INSERT INTO centrin.outdoors VALUES (3, 'V hlavním dvoře', NULL);
INSERT INTO centrin.outdoors VALUES (4, 'Kuřárna', NULL);
INSERT INTO centrin.outdoors VALUES (5, 'Kavárna', NULL);


--
-- TOC entry 3554 (class 0 OID 16425)
-- Dependencies: 233
-- Data for Name: roles; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.roles VALUES (1, 'admin', 'Administrátor');
INSERT INTO centrin.roles VALUES (2, 'user', 'Běžný uživatel');
INSERT INTO centrin.roles VALUES (3, 'guest', 'Host');
INSERT INTO centrin.roles VALUES (4, 'udrzba', 'Údržbář');
INSERT INTO centrin.roles VALUES (8, 'uklizec', 'Uklízeč(ka)');
INSERT INTO centrin.roles VALUES (7, 'pecovatel', 'Pečovatel(ka)');
INSERT INTO centrin.roles VALUES (6, 'sestra', 'Zdravotní sestra');
INSERT INTO centrin.roles VALUES (5, 'supervisor', 'Vedoucí pracovník');
INSERT INTO centrin.roles VALUES (9, 'reditel', 'Ředitel');
INSERT INTO centrin.roles VALUES (10, 'manager', 'Manažer');
INSERT INTO centrin.roles VALUES (11, 'kuchar', 'Kuchař');


--
-- TOC entry 3556 (class 0 OID 16431)
-- Dependencies: 235
-- Data for Name: rooms; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.rooms VALUES (1, 'Prádelna', 1);
INSERT INTO centrin.rooms VALUES (2, 'Kancelář údržby', 1);
INSERT INTO centrin.rooms VALUES (3, 'Dílna', 1);
INSERT INTO centrin.rooms VALUES (4, 'Sklad špinavého prádla', 1);
INSERT INTO centrin.rooms VALUES (5, 'Žehlírna', 1);
INSERT INTO centrin.rooms VALUES (6, 'Sklad potravin', 1);
INSERT INTO centrin.rooms VALUES (7, 'WC', 1);
INSERT INTO centrin.rooms VALUES (8, 'Úklidová místnost', 2);
INSERT INTO centrin.rooms VALUES (9, 'Šatna', 2);
INSERT INTO centrin.rooms VALUES (10, 'Kancelář ředitele', 2);
INSERT INTO centrin.rooms VALUES (11, 'Kancelář poradce technického ředitele', 2);
INSERT INTO centrin.rooms VALUES (12, 'Kancelář jednatele', 2);
INSERT INTO centrin.rooms VALUES (13, 'Kancelář asistenta', 2);
INSERT INTO centrin.rooms VALUES (14, 'Vestibul', 2);
INSERT INTO centrin.rooms VALUES (15, 'Recepce', 2);
INSERT INTO centrin.rooms VALUES (16, 'WC', 2);
INSERT INTO centrin.rooms VALUES (17, 'Kuchyně', 3);
INSERT INTO centrin.rooms VALUES (18, 'Jídelna 1', 3);
INSERT INTO centrin.rooms VALUES (19, 'Jídelna 2', 3);
INSERT INTO centrin.rooms VALUES (20, 'Jídelna 3', 3);
INSERT INTO centrin.rooms VALUES (21, 'WC', 3);
INSERT INTO centrin.rooms VALUES (22, 'Přípravna', 3);
INSERT INTO centrin.rooms VALUES (23, 'WC - Ženy', 4);
INSERT INTO centrin.rooms VALUES (24, 'WC - Muži', 4);
INSERT INTO centrin.rooms VALUES (25, 'Kuchyňka', 4);
INSERT INTO centrin.rooms VALUES (26, 'Mzdová účtárna', 4);
INSERT INTO centrin.rooms VALUES (27, 'Účtárna', 4);
INSERT INTO centrin.rooms VALUES (28, 'Kancelář technického ředitele', 4);
INSERT INTO centrin.rooms VALUES (29, 'Aktivizační dílna', 4);
INSERT INTO centrin.rooms VALUES (30, 'Kancelář aktivizace', 4);
INSERT INTO centrin.rooms VALUES (31, 'Kaple', 4);
INSERT INTO centrin.rooms VALUES (32, 'Velká účebna', 5);
INSERT INTO centrin.rooms VALUES (33, 'Knihovna', 5);
INSERT INTO centrin.rooms VALUES (34, 'Kancelář vedení přímé péče', 5);
INSERT INTO centrin.rooms VALUES (35, 'Kancelář skladového hospodáře', 5);
INSERT INTO centrin.rooms VALUES (36, 'Kancelář hospodářů', 2);
INSERT INTO centrin.rooms VALUES (37, 'Úklidová místnost', 4);
INSERT INTO centrin.rooms VALUES (38, 'Úklidová místnost', 5);
INSERT INTO centrin.rooms VALUES (39, 'Sklad', 5);
INSERT INTO centrin.rooms VALUES (40, 'WC', 5);
INSERT INTO centrin.rooms VALUES (41, 'Pokoj 401', 6);
INSERT INTO centrin.rooms VALUES (42, 'Pokoj 402', 6);
INSERT INTO centrin.rooms VALUES (43, 'Pokoj 403', 6);
INSERT INTO centrin.rooms VALUES (44, 'Pokoj 404', 6);
INSERT INTO centrin.rooms VALUES (45, 'Pokoj 405', 6);
INSERT INTO centrin.rooms VALUES (46, 'Pokoj 406', 6);
INSERT INTO centrin.rooms VALUES (47, 'Pokoj 407', 6);
INSERT INTO centrin.rooms VALUES (48, 'Pokoj 408', 6);
INSERT INTO centrin.rooms VALUES (49, 'Pokoj 409', 6);
INSERT INTO centrin.rooms VALUES (50, 'Pokoj 410', 6);
INSERT INTO centrin.rooms VALUES (51, 'Pokoj 411', 6);
INSERT INTO centrin.rooms VALUES (52, 'Pokoj 412', 6);
INSERT INTO centrin.rooms VALUES (53, 'Pokoj 413', 6);
INSERT INTO centrin.rooms VALUES (54, 'Pokoj 414', 6);
INSERT INTO centrin.rooms VALUES (55, 'Pokoj 415', 6);
INSERT INTO centrin.rooms VALUES (56, 'Sesterna', 6);
INSERT INTO centrin.rooms VALUES (57, 'Dekontaminační místnost', 6);
INSERT INTO centrin.rooms VALUES (58, 'Úklidová místnost', 6);
INSERT INTO centrin.rooms VALUES (59, 'Pokoj 501', 7);
INSERT INTO centrin.rooms VALUES (60, 'Pokoj 502', 7);
INSERT INTO centrin.rooms VALUES (61, 'Pokoj 503', 7);
INSERT INTO centrin.rooms VALUES (62, 'Pokoj 504', 7);
INSERT INTO centrin.rooms VALUES (63, 'Pokoj 505', 7);
INSERT INTO centrin.rooms VALUES (64, 'Pokoj 506', 7);
INSERT INTO centrin.rooms VALUES (65, 'Pokoj 507', 7);
INSERT INTO centrin.rooms VALUES (66, 'Pokoj 508', 7);
INSERT INTO centrin.rooms VALUES (67, 'Pokoj 509', 7);
INSERT INTO centrin.rooms VALUES (68, 'Pokoj 510', 7);
INSERT INTO centrin.rooms VALUES (69, 'Pokoj 511', 7);
INSERT INTO centrin.rooms VALUES (70, 'Pokoj 512', 7);
INSERT INTO centrin.rooms VALUES (71, 'Pokoj 513', 7);
INSERT INTO centrin.rooms VALUES (72, 'Pokoj 514', 7);
INSERT INTO centrin.rooms VALUES (73, 'Pokoj 515', 7);
INSERT INTO centrin.rooms VALUES (74, 'Sesterna', 7);
INSERT INTO centrin.rooms VALUES (75, 'Dekontaminační místnost', 7);
INSERT INTO centrin.rooms VALUES (76, 'Úklidová místnost', 7);
INSERT INTO centrin.rooms VALUES (77, 'Pokoj 601', 8);
INSERT INTO centrin.rooms VALUES (78, 'Pokoj 602', 8);
INSERT INTO centrin.rooms VALUES (79, 'Pokoj 603', 8);
INSERT INTO centrin.rooms VALUES (80, 'Pokoj 604', 8);
INSERT INTO centrin.rooms VALUES (81, 'Pokoj 605', 8);
INSERT INTO centrin.rooms VALUES (82, 'Pokoj 606', 8);
INSERT INTO centrin.rooms VALUES (83, 'Pokoj 607', 8);
INSERT INTO centrin.rooms VALUES (84, 'Pokoj 608', 8);
INSERT INTO centrin.rooms VALUES (85, 'Pokoj 609', 8);
INSERT INTO centrin.rooms VALUES (86, 'Pokoj 610', 8);
INSERT INTO centrin.rooms VALUES (87, 'Pokoj 611', 8);
INSERT INTO centrin.rooms VALUES (88, 'Pokoj 612', 8);
INSERT INTO centrin.rooms VALUES (89, 'Pokoj 613', 8);
INSERT INTO centrin.rooms VALUES (90, 'Pokoj 614', 8);
INSERT INTO centrin.rooms VALUES (91, 'Pokoj 615', 8);
INSERT INTO centrin.rooms VALUES (92, 'Sesterna', 8);
INSERT INTO centrin.rooms VALUES (93, 'Dekontaminační místnost', 8);
INSERT INTO centrin.rooms VALUES (94, 'Úklidová místnost', 8);
INSERT INTO centrin.rooms VALUES (95, 'Pokoj 701', 9);
INSERT INTO centrin.rooms VALUES (96, 'Pokoj 702', 9);
INSERT INTO centrin.rooms VALUES (97, 'Pokoj 703', 9);
INSERT INTO centrin.rooms VALUES (98, 'Pokoj 704', 9);
INSERT INTO centrin.rooms VALUES (99, 'Pokoj 705', 9);
INSERT INTO centrin.rooms VALUES (100, 'Pokoj 706', 9);
INSERT INTO centrin.rooms VALUES (101, 'Pokoj 707', 9);
INSERT INTO centrin.rooms VALUES (102, 'Pokoj 708', 9);
INSERT INTO centrin.rooms VALUES (103, 'Pokoj 709', 9);
INSERT INTO centrin.rooms VALUES (104, 'Pokoj 710', 9);
INSERT INTO centrin.rooms VALUES (105, 'Pokoj 711', 9);
INSERT INTO centrin.rooms VALUES (106, 'Pokoj 712', 9);
INSERT INTO centrin.rooms VALUES (107, 'Pokoj 713', 9);
INSERT INTO centrin.rooms VALUES (108, 'Pokoj 714', 9);
INSERT INTO centrin.rooms VALUES (109, 'Pokoj 715', 9);
INSERT INTO centrin.rooms VALUES (110, 'Sesterna', 9);
INSERT INTO centrin.rooms VALUES (111, 'Dekontaminační místnost', 9);
INSERT INTO centrin.rooms VALUES (112, 'Úklidová místnost', 9);
INSERT INTO centrin.rooms VALUES (113, 'Pokoj 801', 10);
INSERT INTO centrin.rooms VALUES (114, 'Pokoj 802', 10);
INSERT INTO centrin.rooms VALUES (115, 'Pokoj 803', 10);
INSERT INTO centrin.rooms VALUES (116, 'Pokoj 804', 10);
INSERT INTO centrin.rooms VALUES (117, 'Pokoj 805', 10);
INSERT INTO centrin.rooms VALUES (118, 'Pokoj 806', 10);
INSERT INTO centrin.rooms VALUES (119, 'Pokoj 807', 10);
INSERT INTO centrin.rooms VALUES (120, 'Pokoj 808', 10);
INSERT INTO centrin.rooms VALUES (121, 'Pokoj 809', 10);
INSERT INTO centrin.rooms VALUES (122, 'Pokoj 810', 10);
INSERT INTO centrin.rooms VALUES (123, 'Pokoj 811', 10);
INSERT INTO centrin.rooms VALUES (124, 'Pokoj 812', 10);
INSERT INTO centrin.rooms VALUES (125, 'Pokoj 813', 10);
INSERT INTO centrin.rooms VALUES (126, 'Pokoj 814', 10);
INSERT INTO centrin.rooms VALUES (127, 'Pokoj 815', 10);
INSERT INTO centrin.rooms VALUES (128, 'Sesterna', 10);
INSERT INTO centrin.rooms VALUES (129, 'Dekontaminační místnost', 10);
INSERT INTO centrin.rooms VALUES (130, 'Úklidová místnost', 10);
INSERT INTO centrin.rooms VALUES (131, 'Sesterna', 2);
INSERT INTO centrin.rooms VALUES (132, 'Sklad', 2);
INSERT INTO centrin.rooms VALUES (133, 'Tělocvična', 2);
INSERT INTO centrin.rooms VALUES (134, 'Vchod', 2);
INSERT INTO centrin.rooms VALUES (135, 'Pokoj 1', 11);
INSERT INTO centrin.rooms VALUES (136, 'Pokoj 2', 11);
INSERT INTO centrin.rooms VALUES (137, 'Pokoj 3', 11);
INSERT INTO centrin.rooms VALUES (138, 'Pokoj 4', 11);
INSERT INTO centrin.rooms VALUES (139, 'Pokoj 5', 11);
INSERT INTO centrin.rooms VALUES (140, 'Pokoj 6', 11);
INSERT INTO centrin.rooms VALUES (141, 'Sesterna 1', 11);
INSERT INTO centrin.rooms VALUES (142, 'Sesterna 2', 11);
INSERT INTO centrin.rooms VALUES (143, 'Úklidová místnost', 11);
INSERT INTO centrin.rooms VALUES (144, 'WC', 11);


--
-- TOC entry 3558 (class 0 OID 16435)
-- Dependencies: 237
-- Data for Name: severity; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.severity VALUES (1, 'Neklasifikováno');
INSERT INTO centrin.severity VALUES (2, 'Nízká priorita');
INSERT INTO centrin.severity VALUES (3, 'Střední priorita');
INSERT INTO centrin.severity VALUES (4, 'Vysoká priorita');
INSERT INTO centrin.severity VALUES (5, 'Kritická priorita');


--
-- TOC entry 3560 (class 0 OID 16439)
-- Dependencies: 239
-- Data for Name: users; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.users VALUES (1, 'Admin', 'Systému', 'admin', 'admin@admin.test', 'ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920', 1, NULL);
INSERT INTO centrin.users VALUES (17, 'Sestra', 'Zdravotní', 'sestra', '', '30af210ca5fbef05dbc701e374581d5e0d0fcd598db1635afb9ece557979b876', 6, NULL);
INSERT INTO centrin.users VALUES (19, 'Vedoucí', 'Pracovník', 'supervisor', '', 'bb36a6715a585afe48e59a60d48f8161cc3edec455e63959acbfd1035d0df9ba', 5, NULL);
INSERT INTO centrin.users VALUES (28, 'Pečovatelka', 'Testovací', 'pecovatelka', '', '5da764b35ea9d3b54e8957990c0df104d1e1d251430e9977270edf9eae374c8f', 7, NULL);
INSERT INTO centrin.users VALUES (29, 'Manažer', 'Testovací', 'manazer', '', 'cf8e0812b1525f0e5ac8833cbeb1d2c15dc12ea3cda8ce65e07bf81d56f2b8f6', 10, NULL);
INSERT INTO centrin.users VALUES (12, 'Udržbář', 'Testovací', 'udrzbar', '', '62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de', 4, NULL);
INSERT INTO centrin.users VALUES (27, 'Uklízečka', 'Testovací', 'uklizecka', '', 'ee5143ed997ae4aeb45426279dcb7285dc08beaf9220790322a31a6c90275dd5', 8, NULL);
INSERT INTO centrin.users VALUES (3, 'Běžný', 'Uživatel', 'user', 'user@test.foo', '743a25e3896771ed3ebd3cd4b1e673b3aee073dc64b38d72e977fe1c34d1fed7', 2, NULL);
INSERT INTO centrin.users VALUES (22, 'Daniel', 'Brož', 'broz', 'broz.daniel.123@gmail.com', 'ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920', 1, NULL);
INSERT INTO centrin.users VALUES (51, 'Nelinka', 'Sýkorová', 'nelinka', '', 'c88dd5c37a0105ac6fc78275d8c3dddd2e688ceaf02351c0dc27ff6e21df8a07', 6, NULL);
INSERT INTO centrin.users VALUES (53, 'Provozní', 'Vedoucí', 'test', '', '62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de', 10, NULL);
INSERT INTO centrin.users VALUES (54, 'Lojza', 'Karemel', 'karamel', '', 'bc6002236552314b05a5737ec13890636d6511212615fdaea74180923cb125cf', 4, NULL);
INSERT INTO centrin.users VALUES (55, 'Stanislav', 'Pšenička', 'psenicka', '', '62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de', 4, NULL);
INSERT INTO centrin.users VALUES (56, 'Zina', 'Popová', 'popova', '', '62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de', 8, NULL);
INSERT INTO centrin.users VALUES (57, 'Petro', 'Mykhailo', 'mykhailo', '', 'da82643c8dbdbdf96291adc016bdde2c9378aeefab29398c2e3e3875e4301449', 4, NULL);


--
-- TOC entry 3565 (class 0 OID 25333)
-- Dependencies: 253
-- Data for Name: workplans; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.workplans VALUES (2023, 34);
INSERT INTO centrin.workplans VALUES (2023, 35);
INSERT INTO centrin.workplans VALUES (2023, 36);
INSERT INTO centrin.workplans VALUES (2023, 32);
INSERT INTO centrin.workplans VALUES (2023, 33);
INSERT INTO centrin.workplans VALUES (2024, 6);
INSERT INTO centrin.workplans VALUES (2023, 38);
INSERT INTO centrin.workplans VALUES (2023, 31);
INSERT INTO centrin.workplans VALUES (2023, 40);
INSERT INTO centrin.workplans VALUES (2023, 39);
INSERT INTO centrin.workplans VALUES (2023, 51);
INSERT INTO centrin.workplans VALUES (2024, 1);
INSERT INTO centrin.workplans VALUES (2024, 2);
INSERT INTO centrin.workplans VALUES (2023, 52);


--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 220
-- Name: buildings_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.buildings_id_seq', 3, true);


--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 222
-- Name: corridors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.corridors_id_seq', 14, true);


--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 224
-- Name: defect_states_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defect_states_id_seq', 8, true);


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 226
-- Name: defect_types_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defect_types_id_seq', 4, true);


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 228
-- Name: defects_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defects_id_seq', 51, true);


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 230
-- Name: floors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.floors_id_seq', 14, true);


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 249
-- Name: login_logs_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.login_logs_id_seq', 54, true);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 232
-- Name: outdoors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.outdoors_id_seq', 5, true);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 234
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.roles_id_seq', 11, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 236
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.rooms_id_seq', 144, true);


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 238
-- Name: severity_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.severity_id_seq', 5, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 240
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.users_id_seq', 58, true);


--
-- TOC entry 3338 (class 2606 OID 16457)
-- Name: buildings buildings_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_name_key UNIQUE (name);


--
-- TOC entry 3340 (class 2606 OID 16459)
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 16461)
-- Name: corridors corridors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_pkey PRIMARY KEY (id);


--
-- TOC entry 3344 (class 2606 OID 16463)
-- Name: defect_states defect_states_description_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_description_key UNIQUE (description);


--
-- TOC entry 3346 (class 2606 OID 16465)
-- Name: defect_states defect_states_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_pkey PRIMARY KEY (id);


--
-- TOC entry 3348 (class 2606 OID 16467)
-- Name: defect_types defect_types_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_name_key UNIQUE (name);


--
-- TOC entry 3350 (class 2606 OID 16469)
-- Name: defect_types defect_types_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3352 (class 2606 OID 16471)
-- Name: defects defects_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_pkey PRIMARY KEY (id);


--
-- TOC entry 3372 (class 2606 OID 25339)
-- Name: defects_workplans_association defects_workplans_association_pk; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT defects_workplans_association_pk PRIMARY KEY (defect_id, workplan_year, workplan_week);


--
-- TOC entry 3354 (class 2606 OID 16473)
-- Name: floors floors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_pkey PRIMARY KEY (id);


--
-- TOC entry 3356 (class 2606 OID 16475)
-- Name: outdoors outdoors_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_name_key UNIQUE (name);


--
-- TOC entry 3358 (class 2606 OID 16477)
-- Name: outdoors outdoors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_pkey PRIMARY KEY (id);


--
-- TOC entry 3360 (class 2606 OID 16479)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3362 (class 2606 OID 16481)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 3364 (class 2606 OID 16483)
-- Name: severity severity_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_name_key UNIQUE (name);


--
-- TOC entry 3366 (class 2606 OID 16485)
-- Name: severity severity_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_pkey PRIMARY KEY (id);


--
-- TOC entry 3368 (class 2606 OID 16487)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3370 (class 2606 OID 16489)
-- Name: users users_un; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_un UNIQUE (username);


--
-- TOC entry 3374 (class 2606 OID 25337)
-- Name: workplans workplans_pk; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.workplans
    ADD CONSTRAINT workplans_pk PRIMARY KEY (workplan_year, workplan_week);


--
-- TOC entry 3537 (class 2618 OID 25327)
-- Name: all_login_logs_joined _RETURN; Type: RULE; Schema: centrin; Owner: -
--

CREATE OR REPLACE VIEW centrin.all_login_logs_joined AS
 SELECT count(ll.id) AS count,
    min(ll."time") AS first_login,
    max(ll."time") AS last_login,
    u.id AS user_id,
    u.username,
    u.name,
    u.surname,
    r.id AS role_id,
    r.name AS role_name,
    r.description AS role_description
   FROM ((centrin.login_logs ll
     JOIN centrin.users u ON ((u.id = ll.user_id)))
     JOIN centrin.roles r ON ((r.id = u.role_id)))
  GROUP BY u.id, r.id;


--
-- TOC entry 3375 (class 2606 OID 25309)
-- Name: corridors corridors_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3376 (class 2606 OID 25264)
-- Name: defects defects_assigned_to_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 3377 (class 2606 OID 25269)
-- Name: defects defects_corridor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_corridor_id_fkey FOREIGN KEY (corridor_id) REFERENCES centrin.corridors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3378 (class 2606 OID 25274)
-- Name: defects defects_created_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_created_by_fkey FOREIGN KEY (created_by) REFERENCES centrin.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3379 (class 2606 OID 25279)
-- Name: defects defects_outdoor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_outdoor_id_fkey FOREIGN KEY (outdoor_id) REFERENCES centrin.outdoors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3380 (class 2606 OID 25284)
-- Name: defects defects_room_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_room_id_fkey FOREIGN KEY (room_id) REFERENCES centrin.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3381 (class 2606 OID 25289)
-- Name: defects defects_severity_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_severity_id_fkey FOREIGN KEY (severity_id) REFERENCES centrin.severity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3382 (class 2606 OID 25294)
-- Name: defects defects_solved_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_solved_by_fkey FOREIGN KEY (solved_by) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 3383 (class 2606 OID 25299)
-- Name: defects defects_state_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_state_id_fkey FOREIGN KEY (state_id) REFERENCES centrin.defect_states(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3384 (class 2606 OID 25304)
-- Name: defects defects_type_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_type_id_fkey FOREIGN KEY (type_id) REFERENCES centrin.defect_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3391 (class 2606 OID 25358)
-- Name: defects_workplans_association fk_defect_id; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT fk_defect_id FOREIGN KEY (defect_id) REFERENCES centrin.defects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3388 (class 2606 OID 25314)
-- Name: users fk_supervisor; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT fk_supervisor FOREIGN KEY (supervisor_id) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 3392 (class 2606 OID 25363)
-- Name: defects_workplans_association fk_workplan; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT fk_workplan FOREIGN KEY (workplan_year, workplan_week) REFERENCES centrin.workplans(workplan_year, workplan_week);


--
-- TOC entry 3385 (class 2606 OID 25254)
-- Name: floors floors_building_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_building_id_fkey FOREIGN KEY (building_id) REFERENCES centrin.buildings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3386 (class 2606 OID 25259)
-- Name: floors floors_floor_caregiver_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_floor_caregiver_id_fkey FOREIGN KEY (floor_caregiver_id) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 3390 (class 2606 OID 25234)
-- Name: login_logs login_logs_fk; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.login_logs
    ADD CONSTRAINT login_logs_fk FOREIGN KEY (user_id) REFERENCES centrin.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3387 (class 2606 OID 25249)
-- Name: rooms rooms_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3389 (class 2606 OID 25319)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES centrin.roles(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT;


-- Completed on 2024-01-05 17:53:32 CET

--
-- PostgreSQL database dump complete
--

