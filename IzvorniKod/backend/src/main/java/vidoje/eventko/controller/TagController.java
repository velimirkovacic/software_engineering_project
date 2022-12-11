package vidoje.eventko.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vidoje.eventko.dto.TagsResponseDTO;
import vidoje.eventko.service.TagService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    private TagService tagService;


    @GetMapping("")
    public ResponseEntity<TagsResponseDTO> getTags(HttpServletRequest request) {


        return ResponseEntity.ok(new TagsResponseDTO(tagService.getAllTags()));
    }
}
