const bindAll = require('lodash.bindall');
const React = require('react');

const {connect} = require('react-redux');

const {
    openBackdropLibrary,
    openCostumeLibrary,
    openSpriteLibrary,
    closeBackdropLibrary,
    closeCostumeLibrary,
    closeSpriteLibrary
} = require('../reducers/modals');

const TargetPaneComponent = require('../components/target-pane/target-pane.jsx');

class TargetPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelectSprite'
        ]);
    }
    handleSelectSprite (id) {
        this.props.vm.setEditingTarget(id);
    }
    render () {
        return (
            <TargetPaneComponent
                {...this.props}
                onSelectSprite={this.handleSelectSprite}
            />
        );
    }
}

const {
    onSelectSprite, // eslint-disable-line no-unused-vars
    ...targetSelectorProps
} = TargetPaneComponent.propTypes;

TargetPane.propTypes = {
    ...targetSelectorProps
};

const mapStateToProps = state => ({
    editingTarget: state.targets.editingTarget,
    sprites: state.targets.sprites,
    stage: state.targets.stage,
    spriteLibraryVisible: state.modals.spriteLibrary,
    costumeLibraryVisible: state.modals.costumeLibrary,
    backdropLibraryVisible: state.modals.backdropLibrary
});
const mapDispatchToProps = dispatch => ({
    onNewBackdropClick: e => {
        e.preventDefault();
        dispatch(openBackdropLibrary());
    },
    onNewCostumeClick: e => {
        e.preventDefault();
        dispatch(openCostumeLibrary());
    },
    onNewSpriteClick: e => {
        e.preventDefault();
        dispatch(openSpriteLibrary());
    },
    onRequestCloseBackdropLibrary: () => {
        dispatch(closeBackdropLibrary());
    },
    onRequestCloseCostumeLibrary: () => {
        dispatch(closeCostumeLibrary());
    },
    onRequestCloseSpriteLibrary: () => {
        dispatch(closeSpriteLibrary());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(TargetPane);
