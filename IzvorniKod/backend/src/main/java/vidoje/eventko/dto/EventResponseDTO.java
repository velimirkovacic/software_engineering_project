package vidoje.eventko.dto;

import vidoje.eventko.domain.Event;

import java.util.List;

public class EventReposnseDTO {
    private List<Event> eventiKorisnika;

    public List<Event> getEventiKorisnika() {
        return eventiKorisnika;
    }

    public void setEventiKorisnika(List<Event> eventiKorisnika) {
        this.eventiKorisnika = eventiKorisnika;
    }

    @Override
    public String toString() {
        return "EventsReposnseDTO{" +
                "eventiKorisnika=" + eventiKorisnika +
                '}';
    }

    public EventReposnseDTO(List<Event> eventiKorisnika) {
        this.eventiKorisnika = eventiKorisnika;
    }
}
