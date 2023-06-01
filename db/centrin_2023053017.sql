--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg22.04+1)

-- Started on 2023-05-30 17:55:14 CEST

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
-- TOC entry 3458 (class 1262 OID 5)
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
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 3458
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 6 (class 2615 OID 16390)
-- Name: centrin; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA centrin;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16444)
-- Name: buildings; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.buildings (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16443)
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
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 219
-- Name: buildings_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.buildings_id_seq OWNED BY centrin.buildings.id;


--
-- TOC entry 224 (class 1259 OID 16482)
-- Name: corridors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.corridors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


--
-- TOC entry 223 (class 1259 OID 16481)
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
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 223
-- Name: corridors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.corridors_id_seq OWNED BY centrin.corridors.id;


--
-- TOC entry 234 (class 1259 OID 16537)
-- Name: defect_states; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defect_states (
    id integer NOT NULL,
    description character varying(255) NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 16536)
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
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 233
-- Name: defect_states_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defect_states_id_seq OWNED BY centrin.defect_states.id;


--
-- TOC entry 232 (class 1259 OID 16526)
-- Name: defect_types; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defect_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 231 (class 1259 OID 16525)
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
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 231
-- Name: defect_types_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defect_types_id_seq OWNED BY centrin.defect_types.id;


--
-- TOC entry 236 (class 1259 OID 16551)
-- Name: defects; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.defects (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    info text,
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone,
    solved boolean DEFAULT false,
    outdoor_id integer,
    room_id integer,
    corridor_id integer,
    severity_id integer NOT NULL,
    created_by integer NOT NULL,
    assigned_to integer,
    solved_by integer,
    state_id integer,
    type_id integer
);


--
-- TOC entry 235 (class 1259 OID 16550)
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
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 235
-- Name: defects_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.defects_id_seq OWNED BY centrin.defects.id;


--
-- TOC entry 222 (class 1259 OID 16465)
-- Name: floors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.floors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    building_id integer NOT NULL,
    floor_caregiver_id integer
);


--
-- TOC entry 221 (class 1259 OID 16464)
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
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 221
-- Name: floors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.floors_id_seq OWNED BY centrin.floors.id;


--
-- TOC entry 228 (class 1259 OID 16506)
-- Name: outdoors; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.outdoors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


--
-- TOC entry 227 (class 1259 OID 16505)
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
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 227
-- Name: outdoors_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.outdoors_id_seq OWNED BY centrin.outdoors.id;


--
-- TOC entry 216 (class 1259 OID 16413)
-- Name: roles; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.roles (
    id integer NOT NULL,
    name text,
    description text
);


--
-- TOC entry 215 (class 1259 OID 16412)
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
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.roles_id_seq OWNED BY centrin.roles.id;


--
-- TOC entry 226 (class 1259 OID 16494)
-- Name: rooms; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.rooms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    floor_id integer
);


--
-- TOC entry 225 (class 1259 OID 16493)
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
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 225
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.rooms_id_seq OWNED BY centrin.rooms.id;


--
-- TOC entry 230 (class 1259 OID 16517)
-- Name: severity; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.severity (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16516)
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
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 229
-- Name: severity_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.severity_id_seq OWNED BY centrin.severity.id;


--
-- TOC entry 218 (class 1259 OID 16422)
-- Name: users; Type: TABLE; Schema: centrin; Owner: -
--

CREATE TABLE centrin.users (
    id integer NOT NULL,
    name text,
    surname text,
    username text,
    email text,
    password text,
    role_id integer,
    supervisor_id integer
);


--
-- TOC entry 217 (class 1259 OID 16421)
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
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: centrin; Owner: -
--

ALTER SEQUENCE centrin.users_id_seq OWNED BY centrin.users.id;


--
-- TOC entry 3229 (class 2604 OID 16447)
-- Name: buildings id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings ALTER COLUMN id SET DEFAULT nextval('centrin.buildings_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16485)
-- Name: corridors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors ALTER COLUMN id SET DEFAULT nextval('centrin.corridors_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 16540)
-- Name: defect_states id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states ALTER COLUMN id SET DEFAULT nextval('centrin.defect_states_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16529)
-- Name: defect_types id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types ALTER COLUMN id SET DEFAULT nextval('centrin.defect_types_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 16554)
-- Name: defects id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects ALTER COLUMN id SET DEFAULT nextval('centrin.defects_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16468)
-- Name: floors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors ALTER COLUMN id SET DEFAULT nextval('centrin.floors_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 16509)
-- Name: outdoors id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors ALTER COLUMN id SET DEFAULT nextval('centrin.outdoors_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16416)
-- Name: roles id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.roles ALTER COLUMN id SET DEFAULT nextval('centrin.roles_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16497)
-- Name: rooms id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms ALTER COLUMN id SET DEFAULT nextval('centrin.rooms_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16520)
-- Name: severity id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity ALTER COLUMN id SET DEFAULT nextval('centrin.severity_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16425)
-- Name: users id; Type: DEFAULT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users ALTER COLUMN id SET DEFAULT nextval('centrin.users_id_seq'::regclass);


--
-- TOC entry 3436 (class 0 OID 16444)
-- Dependencies: 220
-- Data for Name: buildings; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.buildings VALUES (1, 'Pavilon A');
INSERT INTO centrin.buildings VALUES (2, 'Pavilon B');
INSERT INTO centrin.buildings VALUES (3, 'Budova TKB');


--
-- TOC entry 3440 (class 0 OID 16482)
-- Dependencies: 224
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
-- TOC entry 3450 (class 0 OID 16537)
-- Dependencies: 234
-- Data for Name: defect_states; Type: TABLE DATA; Schema: centrin; Owner: -
--



--
-- TOC entry 3448 (class 0 OID 16526)
-- Dependencies: 232
-- Data for Name: defect_types; Type: TABLE DATA; Schema: centrin; Owner: -
--



--
-- TOC entry 3452 (class 0 OID 16551)
-- Dependencies: 236
-- Data for Name: defects; Type: TABLE DATA; Schema: centrin; Owner: -
--



--
-- TOC entry 3438 (class 0 OID 16465)
-- Dependencies: 222
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
-- TOC entry 3444 (class 0 OID 16506)
-- Dependencies: 228
-- Data for Name: outdoors; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.outdoors VALUES (1, 'U bazénu', NULL);
INSERT INTO centrin.outdoors VALUES (2, 'Před hlavní budovou', NULL);
INSERT INTO centrin.outdoors VALUES (3, 'V hlavním dvoře', NULL);
INSERT INTO centrin.outdoors VALUES (4, 'Kuřárna', NULL);
INSERT INTO centrin.outdoors VALUES (5, 'Kavárna', NULL);


--
-- TOC entry 3432 (class 0 OID 16413)
-- Dependencies: 216
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
-- TOC entry 3442 (class 0 OID 16494)
-- Dependencies: 226
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
-- TOC entry 3446 (class 0 OID 16517)
-- Dependencies: 230
-- Data for Name: severity; Type: TABLE DATA; Schema: centrin; Owner: -
--



--
-- TOC entry 3434 (class 0 OID 16422)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: centrin; Owner: -
--

INSERT INTO centrin.users VALUES (1, 'Admin', 'Systému', 'admin', 'admin@admin.test', 'ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920', 1, NULL);
INSERT INTO centrin.users VALUES (3, 'Běžný', 'Uživatel', 'user', 'user@test.foo', '743a25e3896771ed3ebd3cd4b1e673b3aee073dc64b38d72e977fe1c34d1fed7', 2, NULL);
INSERT INTO centrin.users VALUES (12, 'Udržbář', 'Testovací', 'udrzbar', '', '794002b0a0eb26ea87f7ccf8dc78facae4712fb0de76ee9e02492287a795f587', 4, NULL);
INSERT INTO centrin.users VALUES (17, 'Sestra', 'Zdravotní', 'sestra', '', '30af210ca5fbef05dbc701e374581d5e0d0fcd598db1635afb9ece557979b876', 6, NULL);
INSERT INTO centrin.users VALUES (18, 'Ředitel', 'Testovací', 'reditel', '', 'da206bf796afb8babf033068758799360df1ade58f7ee8efe168773fe4ec422a', 9, NULL);
INSERT INTO centrin.users VALUES (19, 'Vedoucí', 'Pracovník', 'supervisor', '', 'bb36a6715a585afe48e59a60d48f8161cc3edec455e63959acbfd1035d0df9ba', 5, NULL);
INSERT INTO centrin.users VALUES (27, 'Uklízečka', 'Testovací', 'uklizecka', '', 'ee5143ed997ae4aeb45426279dcb7285dc08beaf9220790322a31a6c90275dd5', 8, NULL);
INSERT INTO centrin.users VALUES (28, 'Pečovatelka', 'Testovací', 'pecovatelka', '', '5da764b35ea9d3b54e8957990c0df104d1e1d251430e9977270edf9eae374c8f', 7, NULL);
INSERT INTO centrin.users VALUES (29, 'Manažer', 'Testovací', 'manazer', '', 'cf8e0812b1525f0e5ac8833cbeb1d2c15dc12ea3cda8ce65e07bf81d56f2b8f6', 10, NULL);
INSERT INTO centrin.users VALUES (22, 'Daniel', 'Brož', 'broz', 'broz.daniel.123@gmail.com', 'ef42e7432edff886dbe8c161a92dec9530ccb6738271c1d0b0890967dc219920', 1, NULL);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 219
-- Name: buildings_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.buildings_id_seq', 3, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 223
-- Name: corridors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.corridors_id_seq', 14, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 233
-- Name: defect_states_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defect_states_id_seq', 1, false);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 231
-- Name: defect_types_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defect_types_id_seq', 1, false);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 235
-- Name: defects_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.defects_id_seq', 1, false);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 221
-- Name: floors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.floors_id_seq', 14, true);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 227
-- Name: outdoors_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.outdoors_id_seq', 5, true);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.roles_id_seq', 11, true);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 225
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.rooms_id_seq', 144, true);


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 229
-- Name: severity_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.severity_id_seq', 1, false);


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: centrin; Owner: -
--

SELECT pg_catalog.setval('centrin.users_id_seq', 30, true);


--
-- TOC entry 3247 (class 2606 OID 16451)
-- Name: buildings buildings_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_name_key UNIQUE (name);


--
-- TOC entry 3249 (class 2606 OID 16449)
-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.buildings
    ADD CONSTRAINT buildings_pkey PRIMARY KEY (id);


--
-- TOC entry 3253 (class 2606 OID 16487)
-- Name: corridors corridors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_pkey PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 16544)
-- Name: defect_states defect_states_description_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_description_key UNIQUE (description);


--
-- TOC entry 3271 (class 2606 OID 16542)
-- Name: defect_states defect_states_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_states
    ADD CONSTRAINT defect_states_pkey PRIMARY KEY (id);


--
-- TOC entry 3265 (class 2606 OID 16535)
-- Name: defect_types defect_types_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_name_key UNIQUE (name);


--
-- TOC entry 3267 (class 2606 OID 16533)
-- Name: defect_types defect_types_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defect_types
    ADD CONSTRAINT defect_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 16560)
-- Name: defects defects_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_pkey PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 16470)
-- Name: floors floors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_pkey PRIMARY KEY (id);


--
-- TOC entry 3257 (class 2606 OID 16515)
-- Name: outdoors outdoors_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_name_key UNIQUE (name);


--
-- TOC entry 3259 (class 2606 OID 16513)
-- Name: outdoors outdoors_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.outdoors
    ADD CONSTRAINT outdoors_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16420)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 16499)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16524)
-- Name: severity severity_name_key; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_name_key UNIQUE (name);


--
-- TOC entry 3263 (class 2606 OID 16522)
-- Name: severity severity_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.severity
    ADD CONSTRAINT severity_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16429)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 16440)
-- Name: users users_un; Type: CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_un UNIQUE (username);


--
-- TOC entry 3278 (class 2606 OID 16488)
-- Name: corridors corridors_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.corridors
    ADD CONSTRAINT corridors_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id);


--
-- TOC entry 3280 (class 2606 OID 16586)
-- Name: defects defects_assigned_to_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES centrin.users(id);


--
-- TOC entry 3281 (class 2606 OID 16571)
-- Name: defects defects_corridor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_corridor_id_fkey FOREIGN KEY (corridor_id) REFERENCES centrin.corridors(id);


--
-- TOC entry 3282 (class 2606 OID 16581)
-- Name: defects defects_created_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_created_by_fkey FOREIGN KEY (created_by) REFERENCES centrin.users(id);


--
-- TOC entry 3283 (class 2606 OID 16561)
-- Name: defects defects_outdoor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_outdoor_id_fkey FOREIGN KEY (outdoor_id) REFERENCES centrin.outdoors(id);


--
-- TOC entry 3284 (class 2606 OID 16566)
-- Name: defects defects_room_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_room_id_fkey FOREIGN KEY (room_id) REFERENCES centrin.rooms(id);


--
-- TOC entry 3285 (class 2606 OID 16576)
-- Name: defects defects_severity_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_severity_id_fkey FOREIGN KEY (severity_id) REFERENCES centrin.severity(id);


--
-- TOC entry 3286 (class 2606 OID 16591)
-- Name: defects defects_solved_by_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_solved_by_fkey FOREIGN KEY (solved_by) REFERENCES centrin.users(id);


--
-- TOC entry 3287 (class 2606 OID 16596)
-- Name: defects defects_state_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_state_id_fkey FOREIGN KEY (state_id) REFERENCES centrin.defect_states(id);


--
-- TOC entry 3288 (class 2606 OID 16601)
-- Name: defects defects_type_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.defects
    ADD CONSTRAINT defects_type_id_fkey FOREIGN KEY (type_id) REFERENCES centrin.defect_types(id);


--
-- TOC entry 3274 (class 2606 OID 16545)
-- Name: users fk_supervisor; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT fk_supervisor FOREIGN KEY (supervisor_id) REFERENCES centrin.users(id);


--
-- TOC entry 3276 (class 2606 OID 16471)
-- Name: floors floors_building_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_building_id_fkey FOREIGN KEY (building_id) REFERENCES centrin.buildings(id);


--
-- TOC entry 3277 (class 2606 OID 16476)
-- Name: floors floors_floor_caregiver_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.floors
    ADD CONSTRAINT floors_floor_caregiver_id_fkey FOREIGN KEY (floor_caregiver_id) REFERENCES centrin.users(id);


--
-- TOC entry 3279 (class 2606 OID 16500)
-- Name: rooms rooms_floor_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.rooms
    ADD CONSTRAINT rooms_floor_id_fkey FOREIGN KEY (floor_id) REFERENCES centrin.floors(id);


--
-- TOC entry 3275 (class 2606 OID 16430)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: centrin; Owner: -
--

ALTER TABLE ONLY centrin.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES centrin.roles(id);


-- Completed on 2023-05-30 17:55:17 CEST

--
-- PostgreSQL database dump complete
--

