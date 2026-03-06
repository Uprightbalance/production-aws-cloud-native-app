variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "aws_region" {
  description = "AWS region where the cluster is deployed"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the cluster is deployed"
  type        = string
}

variable "private_subnets" {
  description = "Private subnets used by the EKS node group"
  type        = list(string)
}

variable "alb_controller_namespace" {
  description = "Namespace where AWS Load Balancer Controller will run"
  type        = string
  default     = "kube-system"
}

variable "alb_controller_service_account_name" {
  description = "Service account name used by AWS Load Balancer Controller"
  type        = string
  default     = "aws-load-balancer-controller"
}
