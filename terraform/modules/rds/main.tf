############################################
# Security Group
############################################

resource "aws_security_group" "rds_sg" {
  name        = "${var.environment}-rds-sg"
  description = "Allow PostgreSQL access"
  vpc_id      = var.vpc_id

  ingress {
    description = "Postgres from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.environment}-rds-sg"
  }
}

############################################
# Subnet Group
############################################

resource "aws_db_subnet_group" "this" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name = "${var.environment}-db-subnet-group"
  }
}

############################################
# Random Password
############################################

resource "random_password" "db_password" {
  length  = 20
  special = true
}

############################################
# RDS Instance
############################################

resource "aws_db_instance" "postgres" {
  identifier              = "${var.environment}-postgres"
  engine                  = "postgres"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  storage_type            = "gp3"

  db_name                 = "${var.environment}db"
  username                = "postgres"
  password                = random_password.db_password.result

  db_subnet_group_name    = aws_db_subnet_group.this.name
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]

  publicly_accessible     = false
  multi_az                = var.environment == "prod" ? true : false

  skip_final_snapshot     = false
  deletion_protection     = var.environment == "prod" ? true : false

  backup_retention_period = var.environment == "prod" ? 7 : 1

  storage_encrypted       = true

  tags = {
    Name        = "${var.environment}-postgres"
    Environment = var.environment
  }
}
