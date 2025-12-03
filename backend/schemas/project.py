from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ProjectStatus(str, Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.NOT_STARTED


class ProjectCreate(ProjectBase):
    """Payload for creating a project."""


class ProjectUpdate(BaseModel):
    """Payload for updating a project (all fields optional)."""

    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None


class ProjectOut(ProjectBase):
    """Response model for a project."""

    id: int
    created_at: datetime
    updated_at: datetime

    # Pydantic v2 config
    model_config = {"from_attributes": True}


