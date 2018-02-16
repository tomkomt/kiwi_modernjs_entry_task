export const EMIT_EVENT = 'EMIT_EVENT';
export function emitEvent(event, data = null) {
    return {
        type: EMIT_EVENT,
        event: event,
        data: data
    }
}