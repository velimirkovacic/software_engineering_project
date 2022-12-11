package vidoje.eventko.dto;

import vidoje.eventko.domain.Tag;

import java.util.List;

public class TagsResponseDTO {
    private List<Tag> tags;

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public TagsResponseDTO(List<Tag> tags) {
        this.tags = tags;
    }

    public TagsResponseDTO() {
    }

    @Override
    public String toString() {
        return "TagsResponseDTO{" +
                "tags=" + tags +
                '}';
    }
}
