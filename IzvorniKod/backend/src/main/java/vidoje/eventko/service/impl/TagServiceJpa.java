package vidoje.eventko.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vidoje.eventko.domain.Tag;
import vidoje.eventko.repos.TagRepo;
import vidoje.eventko.service.TagService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TagServiceJpa implements TagService {
    @Autowired
    TagRepo tagRepo;

    @Override
    public Set<Tag> getTagsFromTagIds(List<Long> tagIds) {
        return tagIds.stream().map(t -> tagRepo.getTagByTagId(t).get(0)).collect(Collectors.toSet());
    }
}
