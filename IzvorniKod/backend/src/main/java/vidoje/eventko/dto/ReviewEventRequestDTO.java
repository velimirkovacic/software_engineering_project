package vidoje.eventko.dto;

import javax.validation.constraints.*;

public class ReviewEventRequestDTO extends AlterEventRequestDTO {

    @NotNull
    @Min(value = -1, message = "Recenzija je broj -1, 0 ili 1")
    @Max(value = 1, message = "Recenzija je broj -1, 0 ili 1")
    private Integer review;

    public Integer getReview() {
        return review;
    }

    public void setReview(Integer review) {
        this.review = review;
    }

    @Override
    public String toString() {
        return "ReviewEventRequestDTO{" +
                "review=" + review +
                '}';
    }
}
