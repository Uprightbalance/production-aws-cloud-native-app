output "vpc_id" {
  value = aws_vpc.this.id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}

output "azs" {
  value = var.azs
}

output "vpc_cidr" {
  value = var.vpc_cidr
}
