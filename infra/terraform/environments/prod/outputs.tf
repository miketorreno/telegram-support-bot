output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "control_plane_private_ip" {
  value = module.ec2.control_plane_private_ip
}

output "worker_private_ips" {
  value = module.ec2.worker_private_ips
}
