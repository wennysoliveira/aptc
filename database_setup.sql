-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS meu_app_nuxt;
USE meu_app_nuxt;

-- Tabela de usuários
CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `senha` varchar(191) NOT NULL,
  `role` enum('ADMIN','ASSOCIADO') NOT NULL DEFAULT 'ASSOCIADO',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de associados
CREATE TABLE `associados` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `telefone` varchar(191) DEFAULT NULL,
  `cpf` varchar(191) NOT NULL,
  `endereco` varchar(191) DEFAULT NULL,
  `cidade` varchar(191) DEFAULT NULL,
  `estado` varchar(191) DEFAULT NULL,
  `cep` varchar(191) DEFAULT NULL,
  `dataNascimento` datetime(3) DEFAULT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `associados_email_key` (`email`),
  UNIQUE KEY `associados_cpf_key` (`cpf`),
  UNIQUE KEY `associados_userId_key` (`userId`),
  KEY `associados_userId_fkey` (`userId`),
  CONSTRAINT `associados_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de cursos
CREATE TABLE `cursos` (
  `id` varchar(191) NOT NULL,
  `nome` varchar(191) NOT NULL,
  `tipo` enum('PSICANALISTA','TERAPEUTA') NOT NULL,
  `descricao` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de associações
CREATE TABLE `associacoes` (
  `id` varchar(191) NOT NULL,
  `associadoId` varchar(191) NOT NULL,
  `dataInicio` datetime(3) NOT NULL,
  `dataValidade` datetime(3) NOT NULL,
  `valorPago` double NOT NULL,
  `status` enum('ATIVA','VENCIDA','CANCELADA') NOT NULL DEFAULT 'ATIVA',
  `observacoes` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `associacoes_associadoId_fkey` (`associadoId`),
  CONSTRAINT `associacoes_associadoId_fkey` FOREIGN KEY (`associadoId`) REFERENCES `associados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de cursos dos associados
CREATE TABLE `associado_cursos` (
  `id` varchar(191) NOT NULL,
  `associadoId` varchar(191) NOT NULL,
  `cursoId` varchar(191) NOT NULL,
  `dataFormacao` datetime(3) DEFAULT NULL,
  `instituicao` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `associado_cursos_associadoId_cursoId_key` (`associadoId`,`cursoId`),
  KEY `associado_cursos_associadoId_fkey` (`associadoId`),
  KEY `associado_cursos_cursoId_fkey` (`cursoId`),
  CONSTRAINT `associado_cursos_associadoId_fkey` FOREIGN KEY (`associadoId`) REFERENCES `associados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `associado_cursos_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir dados de exemplo
INSERT INTO `users` (`id`, `email`, `senha`, `role`, `createdAt`, `updatedAt`) VALUES
('user1', 'admin@exemplo.com', '$2b$10$hash', 'ADMIN', NOW(), NOW()),
('user2', 'joao@exemplo.com', '$2b$10$hash', 'ASSOCIADO', NOW(), NOW()),
('user3', 'maria@exemplo.com', '$2b$10$hash', 'ASSOCIADO', NOW(), NOW());

INSERT INTO `associados` (`id`, `nome`, `email`, `telefone`, `cpf`, `endereco`, `cidade`, `estado`, `cep`, `dataNascimento`, `userId`, `createdAt`, `updatedAt`) VALUES
('assoc1', 'João Silva', 'joao@exemplo.com', '(11) 99999-9999', '123.456.789-00', 'Rua A, 123', 'São Paulo', 'SP', '01234-567', '1985-05-15', 'user2', NOW(), NOW()),
('assoc2', 'Maria Santos', 'maria@exemplo.com', '(11) 88888-8888', '987.654.321-00', 'Rua B, 456', 'Rio de Janeiro', 'RJ', '20000-000', '1990-08-20', 'user3', NOW(), NOW());

INSERT INTO `cursos` (`id`, `nome`, `tipo`, `descricao`, `createdAt`, `updatedAt`) VALUES
('curso1', 'Psicanálise Clínica', 'PSICANALISTA', 'Curso completo de psicanálise', NOW(), NOW()),
('curso2', 'Terapia Cognitivo-Comportamental', 'TERAPEUTA', 'TCC para terapeutas', NOW(), NOW());

INSERT INTO `associacoes` (`id`, `associadoId`, `dataInicio`, `dataValidade`, `valorPago`, `status`, `observacoes`, `createdAt`, `updatedAt`) VALUES
('assoc1', 'assoc1', '2024-01-01', '2024-12-31', 500.00, 'ATIVA', 'Associação anual', NOW(), NOW()),
('assoc2', 'assoc2', '2024-02-01', '2024-12-31', 500.00, 'ATIVA', 'Associação anual', NOW(), NOW());

INSERT INTO `associado_cursos` (`id`, `associadoId`, `cursoId`, `dataFormacao`, `instituicao`, `createdAt`) VALUES
('ac1', 'assoc1', 'curso1', '2023-12-15', 'Instituto de Psicanálise', NOW()),
('ac2', 'assoc2', 'curso2', '2023-11-20', 'Centro de Terapia', NOW());
