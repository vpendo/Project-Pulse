from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc, func
from typing import Optional

from backend.db.session import SessionLocal
from backend.models.project import Project
from backend.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut


router = APIRouter(prefix="/projects", tags=["Projects"])


# -------------------------------
# DATABASE DEPENDENCY
# -------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------------
# CREATE
# -------------------------------
@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(**project_in.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return ProjectOut.model_validate(project)


# -------------------------------
# READ - List with pagination & filters
# -------------------------------
@router.get("/", response_model=dict)
def list_projects(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    name: Optional[str] = None,
    status: Optional[str] = Query(
        None, pattern="^(Not Started|In Progress|Completed)$"
    ),
    sort_by: Optional[str] = Query(
        "newest",
        pattern="^(newest|oldest|name_asc|name_desc)$"
    ),
):
    query = db.query(Project)

    # Filters
    if name:
        query = query.filter(Project.name.ilike(f"%{name}%"))
    if status:
        query = query.filter(Project.status == status)

    # Sorting
    if sort_by == "newest":
        query = query.order_by(desc(Project.created_at))
    elif sort_by == "oldest":
        query = query.order_by(asc(Project.created_at))
    elif sort_by == "name_asc":
        query = query.order_by(asc(Project.name))
    elif sort_by == "name_desc":
        query = query.order_by(desc(Project.name))

    # Pagination
    total = query.count()
    offset_value = (page - 1) * page_size
    projects = query.offset(offset_value).limit(page_size).all()

    project_list = [ProjectOut.model_validate(p) for p in projects]
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "items": project_list
    }


# -------------------------------
# READ - Single project
# -------------------------------
@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectOut.model_validate(project)


# -------------------------------
# UPDATE
# -------------------------------
@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Update only provided fields
    for key, value in project_in.model_dump(exclude_unset=True).items():
        if value is not None:
            setattr(project, key, value.value if hasattr(value, 'value') else value)

    db.commit()
    db.refresh(project)
    return ProjectOut.model_validate(project)


# -------------------------------
# DELETE
# -------------------------------
@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}


# -------------------------------
# META ENDPOINTS
# -------------------------------
@router.get("/statuses", response_model=list[str])
def list_statuses():
    """Return all available project statuses."""
    return ["Not Started", "In Progress", "Completed"]


@router.get("/stats", response_model=dict)
def projects_stats(db: Session = Depends(get_db)):
    """Get project statistics."""
    total = db.query(func.count(Project.id)).scalar() or 0
    
    not_started = db.query(func.count(Project.id)).filter(
        Project.status == "Not Started"
    ).scalar() or 0
    
    in_progress = db.query(func.count(Project.id)).filter(
        Project.status == "In Progress"
    ).scalar() or 0
    
    completed = db.query(func.count(Project.id)).filter(
        Project.status == "Completed"
    ).scalar() or 0

    return {
        "total": int(total),
        "not_started": int(not_started),
        "in_progress": int(in_progress),
        "completed": int(completed)
    }


