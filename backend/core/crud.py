from sqlalchemy.orm import Session

from backend import models, schemas


def get_projects(db: Session) -> list[models.Project]:
    return db.query(models.Project).order_by(models.Project.created_at.desc()).all()


def get_project(db: Session, project_id: int) -> models.Project | None:
    return db.query(models.Project).filter(models.Project.id == project_id).first()


def create_project(db: Session, project_in: schemas.ProjectCreate) -> models.Project:
    project = models.Project(
        name=project_in.name,
        description=project_in.description,
        status=project_in.status.value,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def update_project(
    db: Session,
    project: models.Project,
    project_in: schemas.ProjectUpdate,
) -> models.Project:
    if project_in.name is not None:
        project.name = project_in.name
    if project_in.description is not None:
        project.description = project_in.description
    if project_in.status is not None:
        project.status = project_in.status.value
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project: models.Project) -> None:
    db.delete(project)
    db.commit()


