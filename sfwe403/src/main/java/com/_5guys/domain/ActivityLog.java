package com._5guys.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonInclude;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@DiscriminatorValue("ActivityLog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT)
public class ActivityLog extends Log {
    public enum Activity {
        LOGGEDIN,
        LOGGEDOUT,
        CREATED,
        ACTIVATED,
        DEACTIVATED,
        LOCKED,
        UNLOCKED,
        SENTREQUEST,
        UPDATEDPASSWORD,
        ACTIVATEDPENDINGNEWACCOUNT,
        ACTIVATEDLOCKEDACCOUNT,
        SENTNEWPASSWORD
    }

    @Column(name = "activity", unique = false, updatable = true, nullable = true)
    private Activity activity;
}
