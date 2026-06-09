# (Docker Registry)
# This is where we will push the Docker image we built in Phase 1
resource "aws_ecr_repository" "app" {
  name                 = "${var.project_name}-${var.environment}"
  image_tag_mutability = "MUTABLE" # Allows us to overwrite the 'latest' tag

  # Free built-in vulnerability scanning! (This replaces Trivy for now)
  image_scanning_configuration {
    scan_on_push = true 
  }
}