package vidoje.eventko.service;

import vidoje.eventko.domain.Tag;

import java.util.List;
import java.util.Set;

public interface TagService {
    Set<Tag> getTagsFromTagIds(List<Long> tagIds);

    List<Tag> getAllTags();
}
