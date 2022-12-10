package vidoje.eventko.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "Pohadja")
@IdClass(Attends.AttendsKey.class)
public class Attends {
    @Id
    @Column(name = "id_pohadjatelj")
    private Long attendee_id;

    @Id
    @Column(name = "id_dogadjaj")
    private Long event_id;

    @Column(name = "recenzija")
    private Integer review;

    public Long getAttendee_id() {
        return attendee_id;
    }

    public Attends(Long attendee_id, Long event_id, Integer review) {
        this.attendee_id = attendee_id;
        this.event_id = event_id;
        this.review = review;
    }

    public void setAttendee_id(Long attendee_id) {
        this.attendee_id = attendee_id;
    }

    public Long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Long event_id) {
        this.event_id = event_id;
    }

    public Integer getReview() {
        return review;
    }

    public void setReview(Integer review) {
        this.review = review;
    }

    @Override
    public String toString() {
        return "Attends{" +
                "attendee_id=" + attendee_id +
                ", event_id=" + event_id +
                ", review=" + review +
                '}';
    }

    public static class AttendsKey implements Serializable {

        private Long attendee_id;
        private Long event_id;


        public AttendsKey() {
        }

        public AttendsKey(Long attendee_id, Long event_id) {
            this.attendee_id = attendee_id;
            this.event_id = event_id;
        }

        @Override
        public int hashCode() {
            return Objects.hash(attendee_id, event_id);
        }

        @Override
        public String toString() {
            return super.toString();
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            AttendsKey attendsKey = (AttendsKey) o;
            return attendee_id.equals(attendsKey.attendee_id) &&
                    event_id.equals(attendsKey.event_id);
        }

    }
}
