CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,       
    approved BOOLEAN NOT NULL,
    publish BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS portfolios (
    id SERIAL PRIMARY KEY,       
    category VARCHAR(255) NOT NULL,
    client_id BIGINT NOT NULL,
    CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
        REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
    portfolio_id BIGINT NOT NULL,
    CONSTRAINT fk_parent
        FOREIGN KEY(client_id) 
        REFERENCES clients(id),
    CONSTRAINT fk_portfolio
        FOREIGN KEY(portfolio_id) 
        REFERENCES portfolios(id)
);

CREATE TABLE IF NOT EXISTS administrators (
    id SERIAL PRIMARY KEY,       
    level VARCHAR(255) NOT NULL,
    client_id BIGINT NOT NULL,
    CONSTRAINT fk_parent
        FOREIGN KEY(client_id) 
        REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS voters (
    id SERIAL PRIMARY KEY,
    client_id BIGINT,
    CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
        REFERENCES clients(id),
);

CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    portfolio_id BIGINT NOT NULL,
    voter_id BIGINT,
    candidate_id BIGINT,
      CONSTRAINT fk_voters
        FOREIGN KEY(voter_id)
        REFERENCES voters(id),
      CONSTRAINT fk_candidate
        FOREIGN KEY(candidate_id)
        REFERENCES candidates(id)
);

CREATE TABLE IF NOT EXISTS preferences (
    id SERIAL PRIMARY KEY,       
    allowAdmins BOOLEAN NOT NULL,
    allowCandidates BOOLEAN NOT NULL,
    publish BOOLEAN DEFAULT true,
    client_id BIGINT NOT NULL,
    CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
        REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(200),
    name VARCHAR(500) NOT NULL,
    administrator_id BIGINT,
    candidate_id BIGINT,
    client_id BIGINT,
    voter_id BIGINT,
    CONSTRAINT fk_client
        FOREIGN KEY(client_id) 
        REFERENCES clients(id),
      CONSTRAINT fk_administrators
        FOREIGN KEY(administrator_id)
        REFERENCES administrators(id),
      CONSTRAINT fk_candidate
        FOREIGN KEY(candidate_id)
        REFERENCES candidates(id),
      CONSTRAINT fk_voters
        FOREIGN KEY(voter_id)
        REFERENCES voters(id)
);