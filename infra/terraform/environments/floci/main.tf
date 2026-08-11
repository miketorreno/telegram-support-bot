module "vpc" {
  source = "../../modules/vpc"

  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr

  availability_zones = [
    "floci-a",
    "floci-b"
  ]

  public_subnet_cidrs = [
    "10.20.1.0/24",
    "10.20.2.0/24"
  ]

  private_subnet_cidrs = [
    "10.20.11.0/24",
    "10.20.12.0/24"
  ]
}

module "security_groups" {
  source = "../../modules/security"

  project_name = var.project_name
  vpc_id       = module.vpc.vpc_id
}

module "ec2" {
  source = "../../modules/ec2"

  project_name = var.project_name
  ami_id       = var.ami_id

  subnet_ids = module.vpc.public_subnet_ids

  security_group_id = module.security_groups.kubernetes_security_group_id
  key_name          = var.key_name

  control_plane_instance_type = var.kubernetes_control_plane_instance_type
  worker_instance_type        = var.kubernetes_worker_instance_type
  worker_count                = var.kubernetes_worker_count
}
