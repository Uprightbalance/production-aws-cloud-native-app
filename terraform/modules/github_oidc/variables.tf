variable "github_repo" {
  description = "GitHub repository allowed to assume role"
  type        = string
}

variable "role_name" {
  description = "IAM role name"
  type        = string
  default     = "github-actions-role"
}

variable "policy_arn" {
  description = "IAM policy to attach to the role"
  type        = string
}
