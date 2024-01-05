--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

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
-- Name: centrin; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA centrin;


ALTER SCHEMA centrin OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: buildings; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.buildings (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE centrin.buildings OWNER TO postgres;

--
-- Name: corridors; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.corridors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


ALTER TABLE centrin.corridors OWNER TO postgres;

--
-- Name: floors; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.floors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    building_id integer NOT NULL,
    floor_caregiver_id integer
);


ALTER TABLE centrin.floors OWNER TO postgres;

--
-- Name: all_corridors_joined; Type: VIEW; Schema: centrin; Owner: postgres
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


ALTER VIEW centrin.all_corridors_joined OWNER TO postgres;

--
-- Name: defect_states; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.defect_states (
    id integer NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE centrin.defect_states OWNER TO postgres;

--
-- Name: defect_types; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.defect_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE centrin.defect_types OWNER TO postgres;

--
-- Name: defects; Type: TABLE; Schema: centrin; Owner: postgres
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


ALTER TABLE centrin.defects OWNER TO postgres;

--
-- Name: outdoors; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.outdoors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE centrin.outdoors OWNER TO postgres;

--
-- Name: rooms; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.rooms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


ALTER TABLE centrin.rooms OWNER TO postgres;

--
-- Name: severity; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.severity (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE centrin.severity OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: centrin; Owner: postgres
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


ALTER TABLE centrin.users OWNER TO postgres;

--
-- Name: all_defects_joined; Type: VIEW; Schema: centrin; Owner: postgres
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


ALTER VIEW centrin.all_defects_joined OWNER TO postgres;

--
-- Name: all_login_logs_joined; Type: VIEW; Schema: centrin; Owner: postgres
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


ALTER VIEW centrin.all_login_logs_joined OWNER TO postgres;

--
-- Name: all_rooms_joined; Type: VIEW; Schema: centrin; Owner: postgres
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


ALTER VIEW centrin.all_rooms_joined OWNER TO postgres;

--
-- Name: defects_workplans_association; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.defects_workplans_association (
    defect_id integer NOT NULL,
    workplan_year integer NOT NULL,
    workplan_week integer NOT NULL
);


ALTER TABLE centrin.defects_workplans_association OWNER TO postgres;

--
-- Name: workplans; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.workplans (
    workplan_year integer NOT NULL,
    workplan_week integer NOT NULL
);


ALTER TABLE centrin.workplans OWNER TO postgres;

--
-- Name: all_workplans_joined; Type: VIEW; Schema: centrin; Owner: postgres
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


ALTER VIEW centrin.all_workplans_joined OWNER TO postgres;

--
-- Name: buildings_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.buildings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.buildings_id_seq OWNER TO postgres;

--
-- Name: buildings_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.buildings_id_seq OWNED BY centrin.buildings.id;


--
-- Name: corridors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.corridors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.corridors_id_seq OWNER TO postgres;

--
-- Name: corridors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.corridors_id_seq OWNED BY centrin.corridors.id;


--
-- Name: defect_states_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.defect_states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.defect_states_id_seq OWNER TO postgres;

--
-- Name: defect_states_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.defect_states_id_seq OWNED BY centrin.defect_states.id;


--
-- Name: defect_types_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.defect_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.defect_types_id_seq OWNER TO postgres;

--
-- Name: defect_types_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.defect_types_id_seq OWNED BY centrin.defect_types.id;


--
-- Name: defects_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.defects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.defects_id_seq OWNER TO postgres;

--
-- Name: defects_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.defects_id_seq OWNED BY centrin.defects.id;


--
-- Name: floors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.floors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.floors_id_seq OWNER TO postgres;

--
-- Name: floors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.floors_id_seq OWNED BY centrin.floors.id;


--
-- Name: login_logs; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.login_logs (
    id integer NOT NULL,
    "time" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE centrin.login_logs OWNER TO postgres;

--
-- Name: login_logs_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.login_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.login_logs_id_seq OWNER TO postgres;

--
-- Name: login_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.login_logs_id_seq OWNED BY centrin.login_logs.id;


--
-- Name: outdoors_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.outdoors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.outdoors_id_seq OWNER TO postgres;

--
-- Name: outdoors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.outdoors_id_seq OWNED BY centrin.outdoors.id;


--
-- Name: roles; Type: TABLE; Schema: centrin; Owner: postgres
--

CREATE TABLE centrin.roles (
    id integer NOT NULL,
    name text,
    description text
);


ALTER TABLE centrin.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.roles_id_seq OWNED BY centrin.roles.id;


--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.rooms_id_seq OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.rooms_id_seq OWNED BY centrin.rooms.id;


--
-- Name: severity_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.severity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.severity_id_seq OWNER TO postgres;

--
-- Name: severity_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.severity_id_seq OWNED BY centrin.severity.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: centrin; Owner: postgres
--

CREATE SEQUENCE centrin.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE centrin.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: postgres
--

ALTER SEQUENCE centrin.users_id_seq OWNED BY centrin.users.id;


--
-- Name: buildings id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.buildings ALTER COLUMN id SET DEFAULT nextval('centrin.buildings_id_seq'::regclass);


--
-- Name: corridors id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.corridors ALTER COLUMN id SET DEFAULT nextval('centrin.corridors_id_seq'::regclass);


--
-- Name: defect_states id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_states ALTER COLUMN id SET DEFAULT nextval('centrin.defect_states_id_seq'::regclass);


--
-- Name: defect_types id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_types ALTER COLUMN id SET DEFAULT nextval('centrin.defect_types_id_seq'::regclass);


--
-- Name: defects id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects ALTER COLUMN id SET DEFAULT nextval('centrin.defects_id_seq'::regclass);


--
-- Name: floors id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.floors ALTER COLUMN id SET DEFAULT nextval('centrin.floors_id_seq'::regclass);


--
-- Name: login_logs id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.login_logs ALTER COLUMN id SET DEFAULT nextval('centrin.login_logs_id_seq'::regclass);


--
-- Name: outdoors id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.outdoors ALTER COLUMN id SET DEFAULT nextval('centrin.outdoors_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.roles ALTER COLUMN id SET DEFAULT nextval('centrin.roles_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.rooms ALTER COLUMN id SET DEFAULT nextval('centrin.rooms_id_seq'::regclass);


--
-- Name: severity id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.severity ALTER COLUMN id SET DEFAULT nextval('centrin.severity_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.users ALTER COLUMN id SET DEFAULT nextval('centrin.users_id_seq'::regclass);


--
-- Data for Name: buildings; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.buildings (id, name) FROM stdin;
1	Pavilon A
2	Pavilon B
3	Budova TKB
\.


--
-- Data for Name: corridors; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.corridors (id, name, floor_id) FROM stdin;
1	Chodba	1
2	Chodba	2
3	Chodba	3
4	Chodba	4
5	Chodba	5
6	Chodba	6
7	Chodba	7
8	Chodba	8
9	Chodba	9
10	Chodba	10
11	Chodba	11
12	Chodba	12
13	Chodba	13
14	Chodba	14
\.


--
-- Data for Name: defect_states; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.defect_states (id, description) FROM stdin;
2	V řešení
3	Odloženo
5	Výměna za nové
7	Zařízen servis
8	Zrušeno
1	Vytvořeno
4	Nelze vyřešit
6	Vyřešeno
\.


--
-- Data for Name: defect_types; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.defect_types (id, name, description) FROM stdin;
1	Pravidelná údržba	\N
2	Úklid	\N
3	Závada	\N
4	Plánovaná práce	\N
\.


--
-- Data for Name: defects; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.defects (id, description, info, start_time, end_time, solved, outdoor_id, room_id, corridor_id, severity_id, created_by, assigned_to, solved_by, state_id, type_id, note) FROM stdin;
18	test	\N	2023-08-22 09:53:50.355506+00	2023-08-22 09:55:03.264006+00	t	\N	137	\N	5	1	\N	1	8	3	test
11	Nepojízdný vozík	\N	2023-08-21 15:25:40.978482+00	2023-08-22 09:56:01.964967+00	t	\N	51	\N	2	1	12	1	6	3	\N
10	Rozbitý obraz	\N	2023-08-21 15:24:50.803942+00	2023-08-22 09:57:17.270987+00	t	\N	\N	11	3	1	1	1	4	3	nelze
19	Nedopalky	\N	2023-08-22 09:58:40.681046+00	\N	f	4	\N	\N	5	1	\N	\N	1	2	\N
20	Prasklá zeď	Na pravé zdi, od futer až k oknu.	2023-08-22 18:00:37.272311+00	2023-08-22 18:02:49.853907+00	t	\N	63	\N	5	1	22	22	6	3	Prasklina zadělána
21	Nefunkční postel	\N	2023-08-22 18:03:35.854605+00	2023-08-22 18:04:05.094511+00	t	\N	70	\N	4	17	\N	17	8	3	Planý poplach
15	Nesprávný záznam	Toto je příkladový nesprávný záznam na zrušení	2023-08-22 04:56:21.060625+00	2023-08-22 04:56:37.861411+00	t	\N	70	\N	5	12	\N	12	8	3	Testování zrušení
16	Nedopalky	\N	2023-08-22 05:07:43.468038+00	2023-08-22 05:15:57.721835+00	t	4	\N	\N	1	12	\N	12	8	2	Neúplné zadání
4	Rozbitá žárovka	\N	2023-08-17 14:55:25.743625+00	2023-08-22 06:17:40.084213+00	t	\N	1	\N	1	1	22	22	5	3	Nová žárovka odepsána ze skladu
7	Ucpaný záchod	V kavárně jsou ucpané dámské záchody	2023-08-21 06:37:55.851557+00	2023-08-22 06:18:56.913813+00	t	5	\N	\N	4	1	22	22	6	3	\N
14	Protéká WC	\N	2023-08-21 17:00:08.608315+00	2023-08-22 06:42:14.612873+00	t	\N	56	\N	3	17	12	22	6	3	\N
9	Louže	Udělala se nám louže	2023-08-21 11:36:45.078673+00	2023-08-22 06:43:48.764253+00	t	\N	128	\N	5	1	27	27	6	2	\N
23	Nesprávný alarm	\N	2023-08-22 20:12:27.743826+00	2023-08-22 20:12:42.641385+00	t	4	\N	\N	1	1	\N	1	8	3	Testovací záznam
45	Nakrmit ryby	\N	2024-01-05 10:50:52.601568+00	\N	f	1	\N	\N	4	1	\N	\N	1	1	\N
29	Rozbité okno	gjkdfbhglihsdfligsdfohjsůodfjh ghshsdfhsfdhsdh	2023-08-24 06:01:11.994329+00	2023-08-24 06:04:49.566839+00	t	\N	39	\N	5	1	1	12	7	3	test
39	Napustit	Napustit bazén	2023-08-29 09:47:42.821017+00	2024-01-05 15:27:13.453288+00	t	1	\N	\N	5	1	54	12	6	1	\N
5	Ucpaný záchod	\N	2023-08-18 11:36:19.349724+00	\N	f	\N	70	\N	3	22	\N	\N	1	3	\N
8	Rozbité umyvadlo	\N	2023-08-21 06:40:50.303447+00	\N	f	\N	128	\N	4	1	\N	\N	1	3	\N
22	Utopila se ryba	\N	2023-08-24 06:03:10.680214+00	\N	f	1	\N	\N	2	1	\N	\N	3	3	\N
26	Nedopalky	\N	2023-08-23 12:31:34.58946+00	2023-08-23 12:58:58.862007+00	t	4	\N	\N	1	1	\N	1	8	3	Duplicita
25	Nedopalky	\N	2023-08-23 12:30:40.99033+00	2023-08-23 12:59:16.053979+00	t	4	\N	\N	1	1	\N	1	8	3	Duplicita
31	Malování místnosti	\N	2023-08-25 10:25:39.638846+00	2023-08-25 12:29:29.492567+00	t	\N	52	\N	2	1	1	1	6	4	\N
27	Nedopalky	\N	2023-08-23 13:00:17.883388+00	\N	f	4	\N	\N	2	1	\N	\N	3	3	\N
28	Rozbité okno	Na levé straně	2023-08-23 13:46:02.510026+00	\N	f	\N	48	\N	5	12	\N	\N	1	3	\N
36	Vymalovat chodbu TKB	\N	2023-08-25 22:04:52.76931+00	\N	f	\N	\N	12	2	1	1	\N	1	1	\N
34	Vymalovat místnost	\N	2023-08-25 14:17:40.616095+00	\N	f	\N	39	\N	3	1	12	\N	1	1	\N
33	Posekat trávu	\N	2023-08-25 14:09:49.097774+00	\N	f	3	\N	\N	4	1	12	\N	1	4	\N
6	Prasklá podlaha	Je nutno opravit podlahu, aby se klienti nezranili	2023-12-18 11:41:46.186+00	\N	f	\N	\N	4	5	19	\N	\N	1	3	\N
32	Vyčistit bazén	\N	2023-08-25 12:42:55.445904+00	2023-08-29 08:46:21.146354+00	t	1	\N	\N	2	1	57	1	6	4	\N
24	Vypadly všechny knihy	V knihovně popadaly všechny knihy z polic	2023-12-23 11:47:30.625+00	\N	f	\N	33	\N	4	1	\N	\N	1	2	\N
35	Vymalovat chodbu	\N	2023-08-25 21:53:34.283234+00	\N	f	\N	\N	11	5	1	1	\N	2	4	\N
12	Prasklé potrubí	Pod chodníkem prasklo potrubí	2023-12-10 15:37:50.988+00	\N	f	1	\N	\N	5	1	\N	\N	1	3	\N
37	Zazdít okno	\N	2023-08-29 09:29:53.551924+00	\N	f	\N	33	\N	3	1	55	\N	1	4	\N
47	Protéká záchod	\N	2024-01-05 10:52:25.481519+00	\N	f	\N	119	\N	4	1	12	\N	1	3	\N
51	Uklidit voliéru	\N	2024-01-05 12:55:50.37659+00	2024-01-05 14:07:12.409537+00	t	\N	\N	2	1	1	12	12	6	2	\N
49	Vyměnit baterii v hodinách	\N	2024-01-05 12:55:01.797222+00	2024-01-05 14:07:19.636444+00	t	\N	\N	3	2	1	12	12	5	1	\N
48	Vyměnit baterii v hodinách	\N	2024-01-05 12:54:30.508719+00	2024-01-05 14:07:28.034027+00	t	\N	\N	11	2	1	12	12	5	1	\N
38	Vymalovat místnost	\N	2023-08-29 09:42:16.038308+00	\N	f	\N	31	\N	2	1	57	\N	1	1	\N
41	Uklidit nedopalky	\N	2024-01-05 10:48:14.450403+00	\N	f	4	\N	\N	4	3	\N	\N	1	2	\N
42	Uklidit rozsypané střepy	\N	2024-01-05 10:49:00.82012+00	\N	f	\N	\N	14	2	3	\N	\N	1	2	\N
44	Posypat chodník	Je nutné posypat chodník posypovou solí	2024-01-05 10:50:18.379463+00	\N	f	2	\N	\N	3	3	\N	\N	1	3	\N
50	Vyměnit baterii v hodinách	\N	2024-01-05 12:55:23.026273+00	2024-01-05 14:07:35.732861+00	t	\N	\N	2	2	1	12	12	5	1	\N
46	Ostříhat kytky	\N	2024-01-05 10:51:33.558666+00	2024-01-05 14:08:09.625078+00	t	3	\N	\N	3	1	12	12	7	4	Zařízeno
40	Rozbitý mobil	\N	2024-01-05 10:47:48.26965+00	\N	f	\N	73	\N	2	3	12	\N	3	3	\N
13	Rozbitá lampička	\N	2023-12-21 15:42:55.291+00	2024-01-05 14:09:43.853076+00	t	\N	74	\N	2	1	1	1	4	2	Rozbité
43	Rozbité dveře u lednice	\N	2024-01-05 10:49:25.159063+00	2024-01-05 14:48:25.395276+00	t	5	\N	\N	5	3	12	12	4	3	Nelze opravit
\.


--
-- Data for Name: defects_workplans_association; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.defects_workplans_association (defect_id, workplan_year, workplan_week) FROM stdin;
32	2023	34
33	2023	34
31	2023	34
32	2023	35
33	2023	35
39	2023	36
38	2023	36
39	2023	40
38	2023	40
37	2023	40
38	2023	51
37	2023	51
39	2024	1
38	2024	1
37	2024	1
\.


--
-- Data for Name: floors; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.floors (id, name, building_id, floor_caregiver_id) FROM stdin;
1	Podzemí	1	\N
2	Přízemí	1	\N
3	1. patro	1	\N
4	2. patro	1	\N
5	3. patro	1	\N
6	4. patro	1	\N
7	5. patro	1	\N
8	6. patro	1	\N
9	7. patro	1	\N
10	8. patro	1	\N
11	Přízemí	2	\N
12	Přízemí	3	\N
13	1. patro	3	\N
14	2. patro	3	\N
\.


--
-- Data for Name: login_logs; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.login_logs (id, "time", user_id) FROM stdin;
1	2023-08-23 20:19:07.714297+00	22
2	2023-08-23 20:23:12.48559+00	1
3	2023-08-23 20:23:18.204581+00	1
4	2023-08-23 20:23:33.384903+00	27
5	2023-08-23 20:23:40.334358+00	17
6	2023-08-23 20:23:45.942645+00	1
7	2023-08-23 20:39:01.422087+00	1
8	2023-08-24 05:05:08.560917+00	1
9	2023-08-24 05:57:00.632047+00	1
10	2023-08-24 06:03:34.500217+00	12
11	2023-08-24 06:05:43.59157+00	1
12	2023-08-24 08:33:54.492826+00	1
13	2023-08-24 11:47:29.297496+00	1
14	2023-08-24 11:48:44.742513+00	53
15	2023-08-24 11:50:56.752937+00	1
16	2023-08-24 12:40:56.393305+00	1
17	2023-08-24 12:57:10.544497+00	1
18	2023-08-24 14:12:01.959486+00	1
19	2023-08-24 14:12:36.502772+00	1
20	2023-08-24 14:13:05.057163+00	1
21	2023-08-24 17:52:15.820746+00	1
22	2023-08-24 17:57:44.898303+00	1
23	2023-08-25 14:14:12.427451+00	1
24	2023-08-25 18:55:04.103605+00	1
25	2023-08-27 09:27:01.662277+00	1
26	2023-08-29 07:20:38.436149+00	1
27	2023-08-29 12:13:50.870307+00	1
28	2023-10-08 09:29:24.04556+00	1
29	2023-12-19 16:51:02.244438+00	1
30	2023-12-19 17:00:17.201506+00	1
31	2023-12-19 17:04:13.070112+00	1
32	2023-12-19 20:14:16.582443+00	1
33	2023-12-19 20:48:29.900942+00	1
34	2023-12-19 21:13:41.748631+00	1
35	2023-12-20 16:25:30.439833+00	1
36	2024-01-03 11:06:14.055719+00	1
37	2024-01-03 11:38:04.055538+00	1
38	2024-01-03 16:26:04.978462+00	3
39	2024-01-03 20:25:02.073548+00	1
40	2024-01-03 22:27:27.953269+00	3
41	2024-01-03 22:27:38.195931+00	1
42	2024-01-04 10:34:18.678202+00	1
43	2024-01-04 10:35:19.316746+00	3
44	2024-01-04 10:35:49.080102+00	1
45	2024-01-05 10:47:05.132822+00	1
46	2024-01-05 10:47:19.661813+00	3
47	2024-01-05 10:50:23.231236+00	1
48	2024-01-05 14:06:20.971183+00	1
49	2024-01-05 14:06:53.485057+00	12
50	2024-01-05 14:08:37.360019+00	1
51	2024-01-05 14:48:03.271063+00	12
52	2024-01-05 14:48:34.415694+00	1
53	2024-01-05 15:26:16.511631+00	1
54	2024-01-05 15:26:35.606203+00	12
55	2024-01-05 17:15:01.571693+00	1
56	2024-01-05 20:04:07.77534+00	1
1	2023-08-23 20:19:07.714297+00	22
2	2023-08-23 20:23:12.48559+00	1
3	2023-08-23 20:23:18.204581+00	1
4	2023-08-23 20:23:33.384903+00	27
5	2023-08-23 20:23:40.334358+00	17
6	2023-08-23 20:23:45.942645+00	1
7	2023-08-23 20:39:01.422087+00	1
8	2023-08-24 05:05:08.560917+00	1
9	2023-08-24 05:57:00.632047+00	1
10	2023-08-24 06:03:34.500217+00	12
11	2023-08-24 06:05:43.59157+00	1
12	2023-08-24 08:33:54.492826+00	1
13	2023-08-24 11:47:29.297496+00	1
14	2023-08-24 11:48:44.742513+00	53
15	2023-08-24 11:50:56.752937+00	1
16	2023-08-24 12:40:56.393305+00	1
17	2023-08-24 12:57:10.544497+00	1
18	2023-08-24 14:12:01.959486+00	1
19	2023-08-24 14:12:36.502772+00	1
20	2023-08-24 14:13:05.057163+00	1
21	2023-08-24 17:52:15.820746+00	1
22	2023-08-24 17:57:44.898303+00	1
23	2023-08-25 14:14:12.427451+00	1
24	2023-08-25 18:55:04.103605+00	1
25	2023-08-27 09:27:01.662277+00	1
26	2023-08-29 07:20:38.436149+00	1
27	2023-08-29 12:13:50.870307+00	1
28	2023-10-08 09:29:24.04556+00	1
29	2023-12-19 16:51:02.244438+00	1
30	2023-12-19 17:00:17.201506+00	1
31	2023-12-19 17:04:13.070112+00	1
32	2023-12-19 20:14:16.582443+00	1
33	2023-12-19 20:48:29.900942+00	1
34	2023-12-19 21:13:41.748631+00	1
35	2023-12-20 16:25:30.439833+00	1
36	2024-01-03 11:06:14.055719+00	1
37	2024-01-03 11:38:04.055538+00	1
38	2024-01-03 16:26:04.978462+00	3
39	2024-01-03 20:25:02.073548+00	1
40	2024-01-03 22:27:27.953269+00	3
41	2024-01-03 22:27:38.195931+00	1
42	2024-01-04 10:34:18.678202+00	1
43	2024-01-04 10:35:19.316746+00	3
44	2024-01-04 10:35:49.080102+00	1
45	2024-01-05 10:47:05.132822+00	1
46	2024-01-05 10:47:19.661813+00	3
47	2024-01-05 10:50:23.231236+00	1
48	2024-01-05 14:06:20.971183+00	1
49	2024-01-05 14:06:53.485057+00	12
50	2024-01-05 14:08:37.360019+00	1
51	2024-01-05 14:48:03.271063+00	12
52	2024-01-05 14:48:34.415694+00	1
53	2024-01-05 15:26:16.511631+00	1
54	2024-01-05 15:26:35.606203+00	12
55	2024-01-05 17:15:01.571693+00	1
56	2024-01-05 20:04:07.77534+00	1
1	2023-08-23 20:19:07.714297+00	22
2	2023-08-23 20:23:12.48559+00	1
3	2023-08-23 20:23:18.204581+00	1
4	2023-08-23 20:23:33.384903+00	27
5	2023-08-23 20:23:40.334358+00	17
6	2023-08-23 20:23:45.942645+00	1
7	2023-08-23 20:39:01.422087+00	1
8	2023-08-24 05:05:08.560917+00	1
9	2023-08-24 05:57:00.632047+00	1
10	2023-08-24 06:03:34.500217+00	12
11	2023-08-24 06:05:43.59157+00	1
12	2023-08-24 08:33:54.492826+00	1
13	2023-08-24 11:47:29.297496+00	1
14	2023-08-24 11:48:44.742513+00	53
15	2023-08-24 11:50:56.752937+00	1
16	2023-08-24 12:40:56.393305+00	1
17	2023-08-24 12:57:10.544497+00	1
18	2023-08-24 14:12:01.959486+00	1
19	2023-08-24 14:12:36.502772+00	1
20	2023-08-24 14:13:05.057163+00	1
21	2023-08-24 17:52:15.820746+00	1
22	2023-08-24 17:57:44.898303+00	1
23	2023-08-25 14:14:12.427451+00	1
24	2023-08-25 18:55:04.103605+00	1
25	2023-08-27 09:27:01.662277+00	1
26	2023-08-29 07:20:38.436149+00	1
27	2023-08-29 12:13:50.870307+00	1
28	2023-10-08 09:29:24.04556+00	1
29	2023-12-19 16:51:02.244438+00	1
30	2023-12-19 17:00:17.201506+00	1
31	2023-12-19 17:04:13.070112+00	1
32	2023-12-19 20:14:16.582443+00	1
33	2023-12-19 20:48:29.900942+00	1
34	2023-12-19 21:13:41.748631+00	1
35	2023-12-20 16:25:30.439833+00	1
36	2024-01-03 11:06:14.055719+00	1
37	2024-01-03 11:38:04.055538+00	1
38	2024-01-03 16:26:04.978462+00	3
39	2024-01-03 20:25:02.073548+00	1
40	2024-01-03 22:27:27.953269+00	3
41	2024-01-03 22:27:38.195931+00	1
42	2024-01-04 10:34:18.678202+00	1
43	2024-01-04 10:35:19.316746+00	3
44	2024-01-04 10:35:49.080102+00	1
45	2024-01-05 10:47:05.132822+00	1
46	2024-01-05 10:47:19.661813+00	3
47	2024-01-05 10:50:23.231236+00	1
48	2024-01-05 14:06:20.971183+00	1
49	2024-01-05 14:06:53.485057+00	12
50	2024-01-05 14:08:37.360019+00	1
51	2024-01-05 14:48:03.271063+00	12
52	2024-01-05 14:48:34.415694+00	1
53	2024-01-05 15:26:16.511631+00	1
54	2024-01-05 15:26:35.606203+00	12
55	2024-01-05 17:15:01.571693+00	1
56	2024-01-05 20:04:07.77534+00	1
1	2023-08-23 20:19:07.714297+00	22
2	2023-08-23 20:23:12.48559+00	1
3	2023-08-23 20:23:18.204581+00	1
4	2023-08-23 20:23:33.384903+00	27
5	2023-08-23 20:23:40.334358+00	17
6	2023-08-23 20:23:45.942645+00	1
7	2023-08-23 20:39:01.422087+00	1
8	2023-08-24 05:05:08.560917+00	1
9	2023-08-24 05:57:00.632047+00	1
10	2023-08-24 06:03:34.500217+00	12
11	2023-08-24 06:05:43.59157+00	1
12	2023-08-24 08:33:54.492826+00	1
13	2023-08-24 11:47:29.297496+00	1
14	2023-08-24 11:48:44.742513+00	53
15	2023-08-24 11:50:56.752937+00	1
16	2023-08-24 12:40:56.393305+00	1
17	2023-08-24 12:57:10.544497+00	1
18	2023-08-24 14:12:01.959486+00	1
19	2023-08-24 14:12:36.502772+00	1
20	2023-08-24 14:13:05.057163+00	1
21	2023-08-24 17:52:15.820746+00	1
22	2023-08-24 17:57:44.898303+00	1
23	2023-08-25 14:14:12.427451+00	1
24	2023-08-25 18:55:04.103605+00	1
25	2023-08-27 09:27:01.662277+00	1
26	2023-08-29 07:20:38.436149+00	1
27	2023-08-29 12:13:50.870307+00	1
28	2023-10-08 09:29:24.04556+00	1
29	2023-12-19 16:51:02.244438+00	1
30	2023-12-19 17:00:17.201506+00	1
31	2023-12-19 17:04:13.070112+00	1
32	2023-12-19 20:14:16.582443+00	1
33	2023-12-19 20:48:29.900942+00	1
34	2023-12-19 21:13:41.748631+00	1
35	2023-12-20 16:25:30.439833+00	1
36	2024-01-03 11:06:14.055719+00	1
37	2024-01-03 11:38:04.055538+00	1
38	2024-01-03 16:26:04.978462+00	3
39	2024-01-03 20:25:02.073548+00	1
40	2024-01-03 22:27:27.953269+00	3
41	2024-01-03 22:27:38.195931+00	1
42	2024-01-04 10:34:18.678202+00	1
43	2024-01-04 10:35:19.316746+00	3
44	2024-01-04 10:35:49.080102+00	1
45	2024-01-05 10:47:05.132822+00	1
46	2024-01-05 10:47:19.661813+00	3
47	2024-01-05 10:50:23.231236+00	1
48	2024-01-05 14:06:20.971183+00	1
49	2024-01-05 14:06:53.485057+00	12
50	2024-01-05 14:08:37.360019+00	1
51	2024-01-05 14:48:03.271063+00	12
52	2024-01-05 14:48:34.415694+00	1
53	2024-01-05 15:26:16.511631+00	1
54	2024-01-05 15:26:35.606203+00	12
55	2024-01-05 17:15:01.571693+00	1
56	2024-01-05 20:04:07.77534+00	1
57	2024-01-05 22:20:01.157711+00	1
\.


--
-- Data for Name: outdoors; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.outdoors (id, name, description) FROM stdin;
1	U bazénu	\N
2	Před hlavní budovou	\N
3	V hlavním dvoře	\N
4	Kuřárna	\N
5	Kavárna	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.roles (id, name, description) FROM stdin;
1	admin	Administrátor
2	user	Běžný uživatel
3	guest	Host
4	udrzba	Údržbář
8	uklizec	Uklízeč(ka)
7	pecovatel	Pečovatel(ka)
6	sestra	Zdravotní sestra
5	supervisor	Vedoucí pracovník
9	reditel	Ředitel
10	manager	Manažer
11	kuchar	Kuchař
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.rooms (id, name, floor_id) FROM stdin;
1	Prádelna	1
2	Kancelář údržby	1
3	Dílna	1
4	Sklad špinavého prádla	1
5	Žehlírna	1
6	Sklad potravin	1
7	WC	1
8	Úklidová místnost	2
9	Šatna	2
10	Kancelář ředitele	2
11	Kancelář poradce technického ředitele	2
12	Kancelář jednatele	2
13	Kancelář asistenta	2
14	Vestibul	2
15	Recepce	2
16	WC	2
17	Kuchyně	3
18	Jídelna 1	3
19	Jídelna 2	3
20	Jídelna 3	3
21	WC	3
22	Přípravna	3
23	WC - Ženy	4
24	WC - Muži	4
25	Kuchyňka	4
26	Mzdová účtárna	4
27	Účtárna	4
28	Kancelář technického ředitele	4
29	Aktivizační dílna	4
30	Kancelář aktivizace	4
31	Kaple	4
32	Velká účebna	5
33	Knihovna	5
34	Kancelář vedení přímé péče	5
35	Kancelář skladového hospodáře	5
36	Kancelář hospodářů	2
37	Úklidová místnost	4
38	Úklidová místnost	5
39	Sklad	5
40	WC	5
41	Pokoj 401	6
42	Pokoj 402	6
43	Pokoj 403	6
44	Pokoj 404	6
45	Pokoj 405	6
46	Pokoj 406	6
47	Pokoj 407	6
48	Pokoj 408	6
49	Pokoj 409	6
50	Pokoj 410	6
51	Pokoj 411	6
52	Pokoj 412	6
53	Pokoj 413	6
54	Pokoj 414	6
55	Pokoj 415	6
56	Sesterna	6
57	Dekontaminační místnost	6
58	Úklidová místnost	6
59	Pokoj 501	7
60	Pokoj 502	7
61	Pokoj 503	7
62	Pokoj 504	7
63	Pokoj 505	7
64	Pokoj 506	7
65	Pokoj 507	7
66	Pokoj 508	7
67	Pokoj 509	7
68	Pokoj 510	7
69	Pokoj 511	7
70	Pokoj 512	7
71	Pokoj 513	7
72	Pokoj 514	7
73	Pokoj 515	7
74	Sesterna	7
75	Dekontaminační místnost	7
76	Úklidová místnost	7
77	Pokoj 601	8
78	Pokoj 602	8
79	Pokoj 603	8
80	Pokoj 604	8
81	Pokoj 605	8
82	Pokoj 606	8
83	Pokoj 607	8
84	Pokoj 608	8
85	Pokoj 609	8
86	Pokoj 610	8
87	Pokoj 611	8
88	Pokoj 612	8
89	Pokoj 613	8
90	Pokoj 614	8
91	Pokoj 615	8
92	Sesterna	8
93	Dekontaminační místnost	8
94	Úklidová místnost	8
95	Pokoj 701	9
96	Pokoj 702	9
97	Pokoj 703	9
98	Pokoj 704	9
99	Pokoj 705	9
100	Pokoj 706	9
101	Pokoj 707	9
102	Pokoj 708	9
103	Pokoj 709	9
104	Pokoj 710	9
105	Pokoj 711	9
106	Pokoj 712	9
107	Pokoj 713	9
108	Pokoj 714	9
109	Pokoj 715	9
110	Sesterna	9
111	Dekontaminační místnost	9
112	Úklidová místnost	9
113	Pokoj 801	10
114	Pokoj 802	10
115	Pokoj 803	10
116	Pokoj 804	10
117	Pokoj 805	10
118	Pokoj 806	10
119	Pokoj 807	10
120	Pokoj 808	10
121	Pokoj 809	10
122	Pokoj 810	10
123	Pokoj 811	10
124	Pokoj 812	10
125	Pokoj 813	10
126	Pokoj 814	10
127	Pokoj 815	10
128	Sesterna	10
129	Dekontaminační místnost	10
130	Úklidová místnost	10
131	Sesterna	2
132	Sklad	2
133	Tělocvična	2
134	Vchod	2
135	Pokoj 1	11
136	Pokoj 2	11
137	Pokoj 3	11
138	Pokoj 4	11
139	Pokoj 5	11
140	Pokoj 6	11
141	Sesterna 1	11
142	Sesterna 2	11
143	Úklidová místnost	11
144	WC	11
\.


--
-- Data for Name: severity; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.severity (id, name) FROM stdin;
1	Neklasifikováno
2	Nízká priorita
3	Střední priorita
4	Vysoká priorita
5	Kritická priorita
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.users (id, name, surname, username, email, password, role_id, supervisor_id) FROM stdin;
1	Admin	Systému	admin	admin@admin.test	ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920	1	\N
17	Sestra	Zdravotní	sestra		30af210ca5fbef05dbc701e374581d5e0d0fcd598db1635afb9ece557979b876	6	\N
19	Vedoucí	Pracovník	supervisor		bb36a6715a585afe48e59a60d48f8161cc3edec455e63959acbfd1035d0df9ba	5	\N
28	Pečovatelka	Testovací	pecovatelka		5da764b35ea9d3b54e8957990c0df104d1e1d251430e9977270edf9eae374c8f	7	\N
29	Manažer	Testovací	manazer		cf8e0812b1525f0e5ac8833cbeb1d2c15dc12ea3cda8ce65e07bf81d56f2b8f6	10	\N
12	Udržbář	Testovací	udrzbar		62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de	4	\N
27	Uklízečka	Testovací	uklizecka		ee5143ed997ae4aeb45426279dcb7285dc08beaf9220790322a31a6c90275dd5	8	\N
3	Běžný	Uživatel	user	user@test.foo	743a25e3896771ed3ebd3cd4b1e673b3aee073dc64b38d72e977fe1c34d1fed7	2	\N
22	Daniel	Brož	broz	broz.daniel.123@gmail.com	ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920	1	\N
51	Nelinka	Sýkorová	nelinka		c88dd5c37a0105ac6fc78275d8c3dddd2e688ceaf02351c0dc27ff6e21df8a07	6	\N
53	Provozní	Vedoucí	test		62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de	10	\N
54	Lojza	Karemel	karamel		bc6002236552314b05a5737ec13890636d6511212615fdaea74180923cb125cf	4	\N
55	Stanislav	Pšenička	psenicka		62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de	4	\N
56	Zina	Popová	popova		62e4b80ab902189c5ae4a3eab9cba8f26a8e1da5443b34ca698a800437d343de	8	\N
57	Petro	Mykhailo	mykhailo		da82643c8dbdbdf96291adc016bdde2c9378aeefab29398c2e3e3875e4301449	4	\N
\.


--
-- Data for Name: workplans; Type: TABLE DATA; Schema: centrin; Owner: postgres
--

COPY centrin.workplans (workplan_year, workplan_week) FROM stdin;
2023	34
2023	35
2023	36
2023	32
2023	33
2024	6
2023	38
2023	31
2023	40
2023	39
2023	51
2024	1
2024	2
2023	52
\.


--
-- Name: buildings_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.buildings_id_seq', 3, true);


--
-- Name: corridors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.corridors_id_seq', 14, true);


--
-- Name: defect_states_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.defect_states_id_seq', 8, true);


--
-- Name: defect_types_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.defect_types_id_seq', 4, true);


--
-- Name: defects_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.defects_id_seq', 51, true);


--
-- Name: floors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.floors_id_seq', 14, true);


--
-- Name: login_logs_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.login_logs_id_seq', 57, true);


--
-- Name: outdoors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.outdoors_id_seq', 5, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.roles_id_seq', 11, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.rooms_id_seq', 144, true);


--
-- Name: severity_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.severity_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: postgres
--

SELECT pg_catalog.setval('centrin.users_id_seq', 58, true);


--
-- Name: buildings buildings_name_key; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_name_key UNIQUE (name);


--
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- Name: corridors corridors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_pkey PRIMARY KEY (id);


--
-- Name: defect_states defect_states_description_key; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_description_key UNIQUE (description);


--
-- Name: defect_states defect_states_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_pkey PRIMARY KEY (id);


--
-- Name: defect_types defect_types_name_key; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_name_key UNIQUE (name);


--
-- Name: defect_types defect_types_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_pkey PRIMARY KEY (id);


--
-- Name: defects defects_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_pkey PRIMARY KEY (id);


--
-- Name: defects_workplans_association defects_workplans_association_pk; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT defects_workplans_association_pk PRIMARY KEY (defect_id, workplan_year, workplan_week);


--
-- Name: floors floors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_pkey PRIMARY KEY (id);


--
-- Name: outdoors outdoors_name_key; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_name_key UNIQUE (name);


--
-- Name: outdoors outdoors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: severity severity_name_key; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_name_key UNIQUE (name);


--
-- Name: severity severity_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_un; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_un UNIQUE (username);


--
-- Name: workplans workplans_pk; Type: CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.workplans
    ADD CONSTRAINT workplans_pk PRIMARY KEY (workplan_year, workplan_week);


--
-- Name: all_login_logs_joined _RETURN; Type: RULE; Schema: centrin; Owner: postgres
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
-- Name: corridors corridors_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_assigned_to_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: defects defects_corridor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_corridor_id_fkey FOREIGN KEY (corridor_id) REFERENCES centrin.corridors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_created_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_created_by_fkey FOREIGN KEY (created_by) REFERENCES centrin.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_outdoor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_outdoor_id_fkey FOREIGN KEY (outdoor_id) REFERENCES centrin.outdoors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_room_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_room_id_fkey FOREIGN KEY (room_id) REFERENCES centrin.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_severity_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_severity_id_fkey FOREIGN KEY (severity_id) REFERENCES centrin.severity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_solved_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_solved_by_fkey FOREIGN KEY (solved_by) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: defects defects_state_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_state_id_fkey FOREIGN KEY (state_id) REFERENCES centrin.defect_states(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects defects_type_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_type_id_fkey FOREIGN KEY (type_id) REFERENCES centrin.defect_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: defects_workplans_association fk_defect_id; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT fk_defect_id FOREIGN KEY (defect_id) REFERENCES centrin.defects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users fk_supervisor; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT fk_supervisor FOREIGN KEY (supervisor_id) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: defects_workplans_association fk_workplan; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.defects_workplans_association
    ADD CONSTRAINT fk_workplan FOREIGN KEY (workplan_year, workplan_week) REFERENCES centrin.workplans(workplan_year, workplan_week);


--
-- Name: floors floors_building_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_building_id_fkey FOREIGN KEY (building_id) REFERENCES centrin.buildings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: floors floors_floor_caregiver_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_floor_caregiver_id_fkey FOREIGN KEY (floor_caregiver_id) REFERENCES centrin.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: login_logs login_logs_fk; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.login_logs
    ADD CONSTRAINT login_logs_fk FOREIGN KEY (user_id) REFERENCES centrin.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rooms rooms_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: postgres
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES centrin.roles(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT;


--
-- PostgreSQL database dump complete
--

