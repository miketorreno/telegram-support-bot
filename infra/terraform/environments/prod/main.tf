module "vpc" {
  source = "../../modules/vpc"

  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr

  availability_zones   = var.availability_zones
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}

module "security_groups" {
  source = "../../modules/security"

  project_name = var.project_name
  vpc_id       = module.vpc.vpc_id
}

module "ec2" {
  source = "../../modules/ec2"

  project_name = var.project_name

  ami_id = var.ami_id

  subnet_ids = module.vpc.private_subnet_ids

  security_group_id = module.security_groups.kubernetes_security_group_id
  key_name          = var.key_name

  control_plane_instance_type = var.kubernetes_control_plane_instance_type
  worker_instance_type        = var.kubernetes_worker_instance_type
  worker_count                = var.kubernetes_worker_count
}
