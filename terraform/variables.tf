variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "credpal"
}

variable "domain_name" {
  description = "Domain name for SSL"
  type        = string
}

variable "container_image" {
  description = "Container image URI"
  type        = string
}

variable "container_port" {
  default = 3000
}

variable "desired_count" {
  default = 2
}
