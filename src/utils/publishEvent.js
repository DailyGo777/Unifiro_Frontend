/**
 * Hybrid Event Publishing Utility
 * Saves to localStorage locally and prepares API calls for backend
 */

export const publishEvent = async (eventData) => {
    try {
        // 1. PREPARE EVENT OBJECT
        const publishedEvent = {
            id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...eventData,
            createdAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            status: 'active',
            registrationCount: 0,
            views: 0
        };

        // 2. SAVE TO LOCALSTORAGE (Local backup)
        const publishedEvents = JSON.parse(localStorage.getItem('publishedEvents') || '[]');
        publishedEvents.push(publishedEvent);
        localStorage.setItem('publishedEvents', JSON.stringify(publishedEvents));

        // 3. ATTEMPT API CALL (Optional - for backend sync)
        try {
            const response = await fetch('/api/events/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publishedEvent)
            });

            if (!response.ok) {
                console.warn('API publish failed, event saved locally');
                return {
                    success: true,
                    eventId: publishedEvent.id,
                    savedLocally: true,
                    syncedToServer: false,
                    message: 'Event published locally. Will sync when backend is ready.'
                };
            }

            const result = await response.json();
            return {
                success: true,
                eventId: result.eventId || publishedEvent.id,
                savedLocally: true,
                syncedToServer: true,
                message: 'Event published successfully!'
            };
        } catch (apiError) {
            console.warn('API unavailable, event saved to localStorage:', apiError);
            return {
                success: true,
                eventId: publishedEvent.id,
                savedLocally: true,
                syncedToServer: false,
                message: 'Event published locally. Will sync when connected to server.'
            };
        }

    } catch (error) {
        console.error('Failed to publish event:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Collect all event data from localStorage and form state
 */
export const collectEventData = (settingsData) => {
    const formBlocks = JSON.parse(localStorage.getItem('formBlocks') || '[]');
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const coverImage = localStorage.getItem('coverImage');
    const logo = localStorage.getItem('logo');
    const personalTemplate = localStorage.getItem('selectedTemplate');

    return {
        // Event Details
        eventName: settingsData.eventName,
        description: settingsData.description,
        dateTime: settingsData.dateTime,
        location: settingsData.location,
        privacy: settingsData.privacy || 'public',
        
        // Form Configuration
        formBlocks: formBlocks,
        formSettings: {
            requireEmail: settingsData.requireEmail || false,
            requirePhone: settingsData.requirePhone || false,
            allowMultipleRegistrations: settingsData.allowMultipleRegistrations !== false
        },

        // Media & Files
        resources: {
            uploadedFiles: uploadedFiles,
            coverImage: coverImage,
            logo: logo
        },

        // Template Info (if used)
        templateUsed: personalTemplate ? JSON.parse(personalTemplate) : null,

        // Additional settings
        organizer: {
            name: settingsData.organizerName,
            email: settingsData.organizerEmail,
            phone: settingsData.organizerPhone
        }
    };
};

/**
 * Clear working data after successful publish
 */
export const clearWorkingData = () => {
    localStorage.removeItem('formBlocks');
    localStorage.removeItem('uploadedFiles');
    localStorage.removeItem('currentFormData');
    localStorage.removeItem('selectedTemplate');
    // Keep personal templates and cover/logo if user wants to reuse
};

/**
 * Get published events from localStorage
 */
export const getPublishedEvents = () => {
    try {
        return JSON.parse(localStorage.getItem('publishedEvents') || '[]');
    } catch (e) {
        console.error('Failed to load published events:', e);
        return [];
    }
};

/**
 * Get single event by ID
 */
export const getEventById = (eventId) => {
    const events = getPublishedEvents();
    return events.find(e => e.id === eventId);
};

/**
 * Update event status
 */
export const updateEventStatus = (eventId, status) => {
    const events = getPublishedEvents();
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
        events[eventIndex].status = status;
        localStorage.setItem('publishedEvents', JSON.stringify(events));
        
        // Try to sync with backend
        fetch(`/api/events/${eventId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        }).catch(e => console.warn('Could not sync status to server:', e));
        
        return true;
    }
    return false;
};
