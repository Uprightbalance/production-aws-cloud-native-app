############################################
# VPC Outputs
############################################

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "azs" {
  value = module.vpc.azs
}
############################################
# RDS Outputs
############################################

output "db_endpoint" {
  value = module.rds.db_endpoint
}

output "db_name" {
  value = module.rds.db_name
}

output "db_username" {
  value = module.rds.db_username
}

output "db_password" {
  value     = module.rds.db_password
  sensitive = true
}

output "db_port" {
  value = module.rds.db_port
}

############################################
# EKS Outputs
############################################

output "cluster_name" {
  value = module.eks.cluster_name
}

output "cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "cluster_certificate_authority_data" {
  value = module.eks.cluster_certificate_authority_data
  sensitive = true
}

output "oidc_provider_arn" {
  value = module.eks.oidc_provider_arn
}

output "node_group_role_arn" {
  value = module.eks.node_group_role_arn
}

output "oidc_provider_url" {
  description = "OIDC Provider URL"
  value       = module.eks.oidc_provider_url
}

