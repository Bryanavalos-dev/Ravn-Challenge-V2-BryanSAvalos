--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_token; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auth_token (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    token character varying NOT NULL,
    active character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: liked_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.liked_products (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    liked boolean NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updateddAt" timestamp without time zone DEFAULT now() NOT NULL,
    "productId" uuid,
    "userId" uuid
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "unique" character varying NOT NULL,
    name character varying NOT NULL,
    description character varying,
    color character varying NOT NULL,
    "quantityAvailable" integer NOT NULL,
    "initialQuantity" integer NOT NULL,
    price double precision NOT NULL,
    "isAvailable" boolean NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updateddAt" timestamp without time zone DEFAULT now() NOT NULL,
    "categoryId" integer,
    "brandId" integer,
    "imageName" character varying
);


--
-- Name: products_brands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_brands (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: products_brands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_brands_id_seq OWNED BY public.products_brands.id;


--
-- Name: products_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: products_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_categories_id_seq OWNED BY public.products_categories.id;


--
-- Name: products_liked; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_liked (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    liked boolean NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updateddAt" timestamp without time zone DEFAULT now() NOT NULL,
    "productId" uuid,
    "userId" uuid
);


--
-- Name: system_cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_cities (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "stateId" integer
);


--
-- Name: system_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.system_cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: system_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.system_cities_id_seq OWNED BY public.system_cities.id;


--
-- Name: system_countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_countries (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: system_countries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.system_countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: system_countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.system_countries_id_seq OWNED BY public.system_countries.id;


--
-- Name: system_states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.system_states (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "countryId" integer
);


--
-- Name: system_states_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.system_states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: system_states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.system_states_id_seq OWNED BY public.system_states.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "unique" character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    names character varying NOT NULL,
    lastnames character varying NOT NULL,
    dob date,
    "isActive" boolean DEFAULT true NOT NULL,
    phone character varying,
    cellphone character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "profileId" integer
);


--
-- Name: users_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    address1 character varying,
    address2 character varying,
    "default" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "cityId" integer,
    "countryId" integer,
    "stateId" integer,
    "userId" uuid
);


--
-- Name: users_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_profiles (
    id integer NOT NULL,
    name character varying NOT NULL,
    permissions json,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_profiles_id_seq OWNED BY public.users_profiles.id;


--
-- Name: products_brands id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_brands ALTER COLUMN id SET DEFAULT nextval('public.products_brands_id_seq'::regclass);


--
-- Name: products_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_categories ALTER COLUMN id SET DEFAULT nextval('public.products_categories_id_seq'::regclass);


--
-- Name: system_cities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_cities ALTER COLUMN id SET DEFAULT nextval('public.system_cities_id_seq'::regclass);


--
-- Name: system_countries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_countries ALTER COLUMN id SET DEFAULT nextval('public.system_countries_id_seq'::regclass);


--
-- Name: system_states id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_states ALTER COLUMN id SET DEFAULT nextval('public.system_states_id_seq'::regclass);


--
-- Name: users_profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles ALTER COLUMN id SET DEFAULT nextval('public.users_profiles_id_seq'::regclass);


--
-- Data for Name: auth_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_token (id, token, active, "createdAt") FROM stdin;
\.


--
-- Data for Name: liked_products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.liked_products (id, liked, "createdAt", "updateddAt", "productId", "userId") FROM stdin;
45e36c1f-e38a-4adb-841b-625b4461318a	t	2022-03-12 02:20:36.5547	2022-03-12 02:20:36.5547	cf3c1db9-6582-4d4b-acb9-4a9f8b377f72	30cc1a4b-111f-4b43-9380-0f568fe58b53
bc362c4d-705c-44d8-8b1d-820f74c79f31	t	2022-03-12 02:33:21.186377	2022-03-12 02:33:21.186377	bbca368b-4ce2-4f7e-aebe-549133ef2c1b	30cc1a4b-111f-4b43-9380-0f568fe58b53
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, "unique", name, description, color, "quantityAvailable", "initialQuantity", price, "isAvailable", "createdAt", "updateddAt", "categoryId", "brandId", "imageName") FROM stdin;
978e3a54-aee1-4343-8686-326a7127aa8d	H3RFD69BNM	Skinny jeans	body-hugging, mid-rise on	Black	10	10	25	t	2022-03-09 19:04:16.836339	2022-03-09 19:04:16.836339	1	1	\N
85407c01-a3f4-4dea-a6af-1fa51a177d51	VGWOPO	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-11 13:57:48.147331	2022-03-11 13:57:48.147331	1	1	\N
dba40ce2-5558-4f0d-92d1-d5b74799278c	G6WZYG43OA	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-11 14:00:31.914231	2022-03-11 14:00:31.914231	1	1	\N
bbca368b-4ce2-4f7e-aebe-549133ef2c1b	EXJREOT3KF	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-11 14:08:48.114408	2022-03-11 16:01:16.861191	1	1	gcvdh3wig1eqaciw6p83.jpg
cf3c1db9-6582-4d4b-acb9-4a9f8b377f72	6XAR2S94JT	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-11 16:26:54.741335	2022-03-11 16:26:54.741335	1	1	\N
8c0af713-0ab1-4cea-9196-c4ec9fc8d617	BRDSM6QG4V	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-12 18:53:47.498016	2022-03-12 18:53:47.498016	1	1	\N
41e04669-cf37-4e41-9e99-15eaf4d0ded8	SUI2D3WM5L	Jacket	Leather fabric, avant-garde design	#000000	50	50	50.99	t	2022-03-12 18:58:53.463911	2022-03-12 18:58:53.463911	1	1	\N
\.


--
-- Data for Name: products_brands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_brands (id, name, "createdAt") FROM stdin;
1	Lacoste	2022-03-09 18:54:43.082659
\.


--
-- Data for Name: products_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_categories (id, name, "createdAt") FROM stdin;
1	Casual wear	2022-03-09 18:54:09.848107
\.


--
-- Data for Name: products_liked; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_liked (id, liked, "createdAt", "updateddAt", "productId", "userId") FROM stdin;
45e36c1f-e38a-4adb-841b-625b4461318a	t	2022-03-12 02:20:36.5547	2022-03-12 02:20:36.5547	cf3c1db9-6582-4d4b-acb9-4a9f8b377f72	30cc1a4b-111f-4b43-9380-0f568fe58b53
bc362c4d-705c-44d8-8b1d-820f74c79f31	t	2022-03-12 02:33:21.186377	2022-03-12 02:33:21.186377	bbca368b-4ce2-4f7e-aebe-549133ef2c1b	30cc1a4b-111f-4b43-9380-0f568fe58b53
\.


--
-- Data for Name: system_cities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.system_cities (id, name, "createdAt", "updatedAt", "stateId") FROM stdin;
\.


--
-- Data for Name: system_countries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.system_countries (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: system_states; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.system_states (id, name, "createdAt", "updatedAt", "countryId") FROM stdin;
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "unique", email, password, names, lastnames, dob, "isActive", phone, cellphone, "createdAt", "updatedAt", verified, "profileId") FROM stdin;
30cc1a4b-111f-4b43-9380-0f568fe58b53	ADLAHK	bryanavalos91@gmail.com	$2a$09$BB/AlPinecRMckFTSQbATO84ZhieqYXuIKNvjTE9MKVh4K2VHh9rS	Bryan Steve	Avalos Acosta	1998-08-02	t	+503 7291-8546	\N	2022-03-10 15:23:54.871576	2022-03-10 15:23:54.871576	t	1
\.


--
-- Data for Name: users_addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_addresses (id, name, address1, address2, "default", "createdAt", "updatedAt", "cityId", "countryId", "stateId", "userId") FROM stdin;
\.


--
-- Data for Name: users_profiles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_profiles (id, name, permissions, "createdAt") FROM stdin;
1	Manager	{ "createProducts": true, "updateProducts": true, "deleteProducts": true, "changeProductsStatus": true, "uploadImagesPerProducts": true }\n	2022-03-10 15:23:43.46369
\.


--
-- Name: products_brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_brands_id_seq', 1, true);


--
-- Name: products_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_categories_id_seq', 1, true);


--
-- Name: system_cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.system_cities_id_seq', 1, false);


--
-- Name: system_countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.system_countries_id_seq', 1, false);


--
-- Name: system_states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.system_states_id_seq', 1, false);


--
-- Name: users_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_profiles_id_seq', 1, true);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: products_categories PK_0caaab91b663757a4086208d0b0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_categories
    ADD CONSTRAINT "PK_0caaab91b663757a4086208d0b0" PRIMARY KEY (id);


--
-- Name: system_cities PK_27b7411c21e9dc498e6242240ab; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_cities
    ADD CONSTRAINT "PK_27b7411c21e9dc498e6242240ab" PRIMARY KEY (id);


--
-- Name: users_addresses PK_2f8d527df0d3acb8aa51945a968; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "PK_2f8d527df0d3acb8aa51945a968" PRIMARY KEY (id);


--
-- Name: system_countries PK_404f3f8a3f7a7cb6e64dfcd7fb7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_countries
    ADD CONSTRAINT "PK_404f3f8a3f7a7cb6e64dfcd7fb7" PRIMARY KEY (id);


--
-- Name: auth_token PK_4572ff5d1264c4a523f01aa86a0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auth_token
    ADD CONSTRAINT "PK_4572ff5d1264c4a523f01aa86a0" PRIMARY KEY (id);


--
-- Name: products_brands PK_51cda12b857ce86cf49deb7ffbd; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_brands
    ADD CONSTRAINT "PK_51cda12b857ce86cf49deb7ffbd" PRIMARY KEY (id);


--
-- Name: liked_products PK_7404a69a2c40392e121ea2f9e4c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.liked_products
    ADD CONSTRAINT "PK_7404a69a2c40392e121ea2f9e4c" PRIMARY KEY (id);


--
-- Name: system_states PK_91a797f07a43bb8924a4c3b94cb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_states
    ADD CONSTRAINT "PK_91a797f07a43bb8924a4c3b94cb" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: users_profiles PK_e7a7f7db3fc96700d9239e43cda; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT "PK_e7a7f7db3fc96700d9239e43cda" PRIMARY KEY (id);


--
-- Name: products_liked PK_ff993db056bc0010d6705816a86; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_liked
    ADD CONSTRAINT "PK_ff993db056bc0010d6705816a86" PRIMARY KEY (id);


--
-- Name: users_addresses FK_04179ff0797ab2c011db32eed17; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_04179ff0797ab2c011db32eed17" FOREIGN KEY ("cityId") REFERENCES public.system_cities(id);


--
-- Name: liked_products FK_1c03cd0021e309e672b28d570e7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.liked_products
    ADD CONSTRAINT "FK_1c03cd0021e309e672b28d570e7" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: system_states FK_414d3b747384e3fdb00f41d2eab; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_states
    ADD CONSTRAINT "FK_414d3b747384e3fdb00f41d2eab" FOREIGN KEY ("countryId") REFERENCES public.system_countries(id);


--
-- Name: products_liked FK_4bb6142ee97251652e3f6eb2222; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_liked
    ADD CONSTRAINT "FK_4bb6142ee97251652e3f6eb2222" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- Name: users_addresses FK_9ea475e8bc3f328f71431c5e2f2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_9ea475e8bc3f328f71431c5e2f2" FOREIGN KEY ("countryId") REFERENCES public.system_countries(id);


--
-- Name: users FK_b1bda35cdb9a2c1b777f5541d87; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES public.users_profiles(id);


--
-- Name: system_cities FK_b904f9dd0aa8ed2887b57100cb6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.system_cities
    ADD CONSTRAINT "FK_b904f9dd0aa8ed2887b57100cb6" FOREIGN KEY ("stateId") REFERENCES public.system_states(id);


--
-- Name: products_liked FK_be62aee8e0a51bfe462ccafcca7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_liked
    ADD CONSTRAINT "FK_be62aee8e0a51bfe462ccafcca7" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: liked_products FK_dcba46c8ebfec88727c40846d8e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.liked_products
    ADD CONSTRAINT "FK_dcba46c8ebfec88727c40846d8e" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- Name: products FK_ea86d0c514c4ecbb5694cbf57df; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES public.products_brands(id);


--
-- Name: users_addresses FK_f37ee0c84e56c1124a44a0af14e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_f37ee0c84e56c1124a44a0af14e" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_addresses FK_f9e99beb6fb7ee6abe913efa23d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_addresses
    ADD CONSTRAINT "FK_f9e99beb6fb7ee6abe913efa23d" FOREIGN KEY ("stateId") REFERENCES public.system_states(id);


--
-- Name: products FK_ff56834e735fa78a15d0cf21926; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES public.products_categories(id);


--
-- PostgreSQL database dump complete
--

