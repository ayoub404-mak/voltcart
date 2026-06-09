# (Project Configuration)

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "eu-west-3" # Paris
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "gocart"
}

variable "environment" {
  description = "Environment (dev, prod)"
  type        = string
  default     = "dev"
}