variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "telegram-support-bot"
}

variable "environment" {
  description = "Environments (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "ami_id" {
  type = string
  # default     = "ami-ubuntu2404-amd64"
  description = "AMI/image ID to use for instances"
}

variable "vpc_cidr" {
  type    = string
  default = "10.20.0.0/16"
}

variable "availability_zones" {
  type = list(string)

  default = [
    "us-east-1a",
    "us-east-1b"
  ]
}

variable "public_subnet_cidrs" {
  type = list(string)

  default = [
    "10.20.1.0/24",
    "10.20.2.0/24"
  ]
}

variable "private_subnet_cidrs" {
  type = list(string)

  default = [
    "10.20.11.0/24",
    "10.20.12.0/24"
  ]
}

variable "kubernetes_control_plane_instance_type" {
  type    = string
  default = "t3.medium"
}

variable "kubernetes_worker_instance_type" {
  type    = string
  default = "t3.medium"
}

variable "kubernetes_worker_count" {
  type    = number
  default = 2
}

variable "key_name" {
  type        = string
  description = "Existing AWS EC2 key pair name"
}
